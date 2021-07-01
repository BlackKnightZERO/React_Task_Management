
const callApi = async (method, url, dataObj) => {
      try {
         return await axios({
              method: method,
              url: url,
              data: dataObj,
            });
      } catch (e) {
          return e.response
      }
  };

  export default {
    callApi
  };
