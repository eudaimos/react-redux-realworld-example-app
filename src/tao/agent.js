import TAO /*, { AppCtx } */ from "@tao.js/core";
import agent from "../agent";

const proxyCatch = {
  apply: (target, thisArg, argsList) => {
    // if (target === agent.Auth.login) {
    //   return target.call(thisArg, ...argsList);
    // }
    return target.call(thisArg, ...argsList).catch((err) => {
      if (err.response && err.response.unauthorized) {
        TAO.setCtx({ t: "user", a: "exit", o: "anon" });
      }
      throw err;
    });
  },
};

const proxyApi = {
  get: (target, prop, receiver) => {
    const origMethod = target[prop];
    return new Proxy(origMethod, proxyCatch);
    // return function(...args) {

    // }
  },
};

const proxyAgent = {
  get: (target, prop, receiver) => {
    if (prop === "Auth") {
      return target[prop];
    }
    return new Proxy(target[prop], proxyApi);
  },
};

export default new Proxy(agent, proxyAgent);
// // function proxy
// for (let o in agent) {
//   console.log(`agent[${o}]:`, agent[o]);
// }

// export default agent;
