class ExampleService {
  constructor(data) {
    this.allData = data;
  }

  getData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.allData);
      }, 1000);
    });
  }
}

export default ExampleService;
