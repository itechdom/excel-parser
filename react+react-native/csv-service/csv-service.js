import { observer } from "mobx-react";
import { observable, action, runInAction, toJS } from "mobx";
import React from "react";
import { data } from "../../medications";

let finalObject = {};
let id = -1;
const axios = {
  get: (url, options) => {
    return new Promise((resolve, reject) => {
      Object.keys(data)
        .map(key => {
          if (key === "Medication") {
            data[key].map(med => {
              finalObject[med] = {};
            });
          }
          return key;
        })
        .map(key => {
          if (key !== "Medication") {
            Object.keys(finalObject).map((k, i) => {
              finalObject[k][key] = data[key][i];
            });
          }
        });
      let fd = Object.keys(finalObject).map(k => {
        return {
          _id: `${++id}`,
          title: k,
          ...finalObject[k]
        };
      });
      return resolve({
        data: { list: fd, medicationTypes: data["Medication Type"] }
      });
    });
  },
  post: (url, options) => {},
  put: (url, options) => {},
  delete: (url, options) => {}
};

//export store
export class csvDomainStore {
  modelName;
  mapStore = observable.map();
  rootStore;
  SERVER;
  offlineStorage;
  notificationDomainStore;
  constructor(rootStore, offlineStorage, SERVER, notificationDomainStore) {
    this.rootStore = rootStore;
    this.notificationDomainStore = notificationDomainStore;
    if (offlineStorage) {
      this.offlineStorage = offlineStorage;
    }
    this.SERVER = "local";
  }
  @action
  forceUpdate(modelName) {
    let current = this.mapStore.get(modelName);
    this.mapStore.set(modelName, []);
    this.mapStore.set(modelName, current);
  }
  @action
  getModel(query, modelName, refresh, transform) {
    //cached data, you don't have to hit up he end point
    if (this.mapStore.get(modelName) && !refresh) {
      return;
    }
    return axios
      .get(`${this.SERVER.host}:${this.SERVER.port}/${modelName}`)
      .then(res => {
        runInAction(() => {
          if (transform) {
            let transformedModel = transform(res.data);
            return this.mapStore.set(modelName, transformedModel);
          }
          this.mapStore.set(modelName, res.data.list);
          this.mapStore.set(`${modelName}_types`, res.data.medicationTypes);
        });
      })
      .catch(err => {
        this.setError(modelName, err);
      });
  }
  @action
  createModel(modelName, model) {
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .post(`${this.SERVER.host}:${this.SERVER.port}/${modelName}/create`, {
          model,
          token
        })
        .then(res => {
          let current = this.mapStore.get(modelName);
          this.mapStore.set(modelName, [...current, res.data]);
          this.setSuccess(modelName, `${modelName} successfully created!`);
          return res.data;
        })
        .catch(err => {
          console.log("hellooooo", err);
          return this.setError(modelName, err);
        });
    });
  }
  @action
  updateModel(modelName, model, updateValues) {
    let extractedModel = toJS(model);
    Object.keys(updateValues).map(key => {
      model[key] = updateValues[key];
    });
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .put(`${this.SERVER.host}:${this.SERVER.port}/${modelName}`, {
          model,
          token
        })
        .then(res => {
          let updatedModel = this.mapStore
            .get(modelName)
            .map(cModel => (cModel._id === model._id ? model : cModel));
          this.mapStore.set(modelName, updatedModel);
          this.setSuccess(modelName, `${modelName} successfully updated!`);
          return res.data;
        })
        .catch(err => {
          return this.setError(modelName, err);
        });
    });
  }
  @action
  deleteModel(modelName, model) {
    model.deleted = true;
    this.forceUpdate(modelName);
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .delete(
          `${this.SERVER.host}:${this.SERVER.port}/${modelName}/${model._id}`,
          {
            params: { token }
          }
        )
        .then(res => {
          this.setSuccess(modelName, `${modelName} successfully deleted!`);
          return res.data;
        })
        .catch(err => {
          return this.setError(modelName, err);
        });
    });
  }
  @action
  searchModel(modelName, query) {
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .post(`${this.SERVER.host}:${this.SERVER.port}/${modelName}/search`, {
          query,
          token
        })
        .then(res => {
          return res.data;
        })
        .catch(err => {
          return this.setError(modelName, err);
        });
    });
  }
  @action
  setError(modelName, err) {
    if (this.notificationDomainStore) {
      this.notificationDomainStore.saveNotification(modelName, {
        message: err && err.response && err.response.data.message,
        type: "error"
      });
    }
  }
  @action
  setSuccess(modelName, successMessage) {
    if (this.notificationDomainStore) {
      this.notificationDomainStore.saveNotification(modelName, {
        message: successMessage,
        type: "success"
      });
    }
  }
  @action
  getAppSettings() {
    return this.offlineStorage.getItem("jwtToken").then(token => {
      return axios
        .get(`${this.SERVER.host}:${this.SERVER.port}/settings`, {
          params: { token }
        })
        .then(res => {
          runInAction(() => {
            this.mapStore.set("settings", res.data);
          });
          return res.data[0];
        })
        .catch(err => {
          this.setError("settings", err);
        });
    });
  }
}

const injectProps = (
  csvDomainStore,
  modelName,
  props,
  child,
  query,
  transform
) => {
  let injected = {
    getModel: query =>
      csvDomainStore.getModel(query, modelName, true, transform),
    createModel: model => csvDomainStore.createModel(modelName, model),
    updateModel: (model, updateValues) =>
      csvDomainStore.updateModel(modelName, model, updateValues),
    deleteModel: model => csvDomainStore.deleteModel(modelName, model),
    query: query,
    ...props,
    ...child.props
  };

  injected[modelName] = transform
    ? transform(csvDomainStore.mapStore.get(modelName))
    : csvDomainStore.mapStore.get(modelName);
  injected[`${modelName}_types`] = csvDomainStore.mapStore.get(
    `${modelName}_types`
  );
  injected[`${modelName}_getModel`] = query => {
    csvDomainStore.getModel(query, modelName, true, transform);
  };
  injected[`${modelName}_createModel`] = model =>
    csvDomainStore.createModel(modelName, model);

  injected[`${modelName}_updateModel`] = (model, updateValues) =>
    csvDomainStore.updateModel(modelName, model, updateValues);

  injected[`${modelName}_deleteModel`] = model =>
    csvDomainStore.deleteModel(modelName, model);

  injected[`${modelName}_searchModel`] = query =>
    csvDomainStore.searchModel(modelName, query);

  injected[`searchModels`] = (modelNames, query) => {
    let promises = modelNames.map(modelName => {
      return csvDomainStore.searchModel(modelName, query).then(res => {
        return { modelName, res };
      });
    });
    return promises;
  };

  injected[`${modelName}_query`] = query;

  return injected;
};

//determine the theme here and load the right login information?
@observer
export class CSV extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  componentDidUpdate() {}
  render() {
    let {
      modelName,
      children,
      csvDomainStore,
      skipLoadOnInit,
      query,
      transform
    } = this.props;
    if (modelName && !skipLoadOnInit) {
      csvDomainStore.getModel(query, modelName, false);
    }
    const childrenWithProps = React.Children.map(children, child => {
      let injectedProps = injectProps(
        csvDomainStore,
        modelName,
        this.props,
        child,
        query,
        transform
      );
      return React.cloneElement(child, injectedProps);
    });
    return <React.Fragment>{childrenWithProps}</React.Fragment>;
  }
}

export function withCSV(WrappedComponent) {
  @observer
  class Withcsv extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      let { modelName, csvDomainStore, query } = this.props;
      csvDomainStore.getModel(query, modelName, false);
    }
    componentWillReceiveProps() {}
    render() {
      let { modelName, csvDomainStore, query, transform } = this.props;
      let injectedProps = injectProps(
        csvDomainStore,
        modelName,
        this.props,
        this,
        query,
        transform
      );
      return <WrappedComponent {...injectedProps} />;
    }
  }
  return Withcsv;
}
