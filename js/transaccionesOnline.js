var transacciones = new Vue({
  el: "#transaccionesOnline",
  vuetify: new Vuetify(),
  data: {
    datos_clientes: [],
    datos_clientes_totales: {
      totaltxventa: 0,
      sumatxventa: {
        montotrx__sum: 0
      },
      totaltxpago: 0,
      sumatxpago: {
        montotrx__sum: 0
      },
      totaltxavance: 0,
      sumatxavance: {
        montotrx__sum: 0
      }
    },
    tiendas: [
      {
        codigo_tienda: "26",
        nombre_tienda: "E-Commerce",
        ip_tienda: ""
      },
      {
        codigo_tienda: "46",
        nombre_tienda: "Panamericana",
        ip_tienda: "172.30.146.1"
      },
      {
        codigo_tienda: "44",
        nombre_tienda: "Plaza Norte",
        ip_tienda: "172.30.144.1"
      },
      {
        codigo_tienda: "87",
        nombre_tienda: "Plaza Victoria",
        ip_tienda: "172.30.187.1"
      },
      {
        codigo_tienda: "43",
        nombre_tienda: "Plaza Oeste",
        ip_tienda: "172.30.187.1"
      },
      {
        codigo_tienda: "86",
        nombre_tienda: "Arauco Maipú",
        ip_tienda: "172.30.187.1"
      },
      {
        codigo_tienda: "25",
        nombre_tienda: "Plaza Maipu",
        ip_tienda: "172.30.187.1"
      }
    ],
    paginacion: 1,
    tiendaId: 0,
    optionDefault: "SEL",
    loading: false,
    alert: false,
    headers: [
      { text: "Numero Trx", value: "globaltrx", width: 78, class: "caption" },
      { text: "Vigencia", value: "vigencia", width: 78, class: "caption" },
      { text: "Transaccion", value: "nombre_trx", width: 99, class: "caption" },
      {
        text: "C. Autorizacion",
        value: "codigoautorizacion",
        width: 111,
        class: "caption"
      },

      { text: "Caja", value: "caja", width: 54, class: "caption" },
      { text: "Fecha", value: "fecha", width: 64, class: "caption" },
      { text: "Hora", value: "hora", width: 62, class: "caption" },
      {
        text: "N° Referencia",
        value: "numeroreferencia",
        width: 104,
        class: "caption"
      },
      {
        text: "N° Cuotas",
        value: "numero_cuota",
        width: 79,
        class: "caption"
      },
      { text: "V. Cuota", value: "valor_cuota", width: 72, class: "caption" },
      {
        text: "Monto Trx",
        value: "montotrx",
        width: 71,
        class: "caption"
      },
      {
        text: "Vendedor",
        value: "codigo_vendedor",
        width: 72,
        class: "caption"
      },
      { text: "Rut", value: "rut", width: 78, class: "caption" }
    ]
  },
  created: function() {
    //this.cargarTransacciones();
    //this.cargarTiendas();
    this.setActive();
  },
  methods: {
    cargarTransacciones: function() {
      var api_get_url = "http://172.18.14.82:8989/api/txonline/?ordering=-hora";
      console.log("URL: " + api_get_url);
      axios
        .get(api_get_url)
        .then(function(respuesta) {
          transacciones.loading = "false";
          transacciones.datos_clientes = respuesta.data.results;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarTiendas: function() {
      var api_get_url = "http://172.18.14.82:8989/api/tiendas/?limit=100";
      console.log("URL: " + api_get_url);
      axios
        .get(api_get_url)
        .then(function(respuesta) {
          transacciones.tiendas = respuesta.data.results;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cargarTransaccionesByTienda: function() {
      transacciones.loading = true;

      var api_get_url =
        "http://172.18.14.82:8989/api/txonline?search=" +
        this.tiendaId +
        "&ordering=-hora"; /*tabla*/
      var api_get_url2 =
        "http://172.18.14.82:8989/api/txonline/local/" +
        this.tiendaId +
        "/"; /*dashboard resumnes*/

      console.log("url: " + api_get_url);
      console.log("url2: " + api_get_url2);

      axios
        .get(api_get_url)
        .then(function(respuesta) {
          transacciones.datos_clientes = respuesta.data.results;
          transacciones.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
        .get(api_get_url2)
        .then(function(respuestaTotales) {
          transacciones.datos_clientes_totales = respuestaTotales.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    startInterval: function() {
      setInterval(() => {
        this.actualizarTiendaIntervalo();
      }, 60000);
    },
    closeAlert: function() {
      this.alert = false;
    },
    actualizarTiendaIntervalo() {
      this.alert = true;
      var api_get_url =
        "http://172.18.14.82:8989/api/txonline?search=" + this.tiendaId;
      var api_get_url2 =
        "http://172.18.14.82:8989/api/txonline/local/" + this.tiendaId + "/";

      console.log("url: " + api_get_url);
      console.log("url2: " + api_get_url2);

      axios
        .get(api_get_url)
        .then(function(respuesta) {
          transacciones.datos_clientes = respuesta.data.results;
        })
        .catch(function(error) {
          console.log(error);
        });
      axios
        .get(api_get_url2)
        .then(function(respuestaTotales) {
          transacciones.datos_clientes_totales = respuestaTotales.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setActive: function() {
      $("#liTransacciones").addClass("active liActive");
      $("#liTxtTransacciones").html("Transacciones Diarias");
    },
    descargarExcel: function() {
      var api_get_url = "http://172.18.14.82:8989/api/csv/" + this.tiendaId;
      window.location.replace(api_get_url);
    },
    disableF5(e) {
      if ((e.which || e.keyCode) == 116) {
        e.preventDefault();
        transacciones.actualizarTiendaIntervalo();
      }
    }
  }
});

$(document).on("keydown", transacciones.disableF5);
