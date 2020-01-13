if (VueCurrencyFilter) {
  Vue.use(VueCurrencyFilter, {
    symbol: "$",
    thousandsSeparator: ".",
    fractionCount: 0,
    fractionSeparator: ",",
    symbolPosition: "front",
    symbolSpacing: false
  });
}
