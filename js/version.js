var version = new Vue({
  el: "#version",
  data: {
    HTMLcontent: null
  },
  created() {
    this.HTMLcontent = `
        Version: 1.03
      `;
  }
});
