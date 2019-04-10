//add localStorage
import { SERVER } from "../../config";
import queryString from "query-string";

let offlineStorage = {
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      localStorage.setItem(key, value);
      resolve({ key, value });
    });
  },
  getItem: key => {
    return new Promise((resolve, reject) => {
      resolve(localStorage.getItem(key));
    });
  },
  removeItem: key => {
    return new Promise((resolve, reject) => {
      resolve(localStorage.removeItem(key));
    });
  }
};

export default class RootStore {
  constructor({
    notificationDomainStore,
    csvDomainStore
  }) {
    this.notificationDomainStore = new notificationDomainStore(
      this,
      offlineStorage,
      SERVER
    );
    this.csvDomainStore = new csvDomainStore(this,offlineStorage,SERVER);
  }
}
