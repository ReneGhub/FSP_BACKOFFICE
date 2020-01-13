var vm = new Vue({
  el: "#app",
  data: {
    datos_cliente: {},
    rut_cliente: "",
    nuevo_pan: "",
    editando: false,
    esconderPanel: false
  },
  created: function() {
    this.setActive();
    $("#inputPan").attr("maxlength", 6);
  },
  methods: {
    buscarCliente: function() {
      if (vm.editando == true) {
        this.cambiarModoEdicion();
      }
      if (vm.rut_cliente.length == 0) {
        vm.rut_cliente = "";
      }
      var api_get_url =
        "http://172.18.14.82:8989/api/bimaestrotarjeta/rut/" + vm.rut_cliente;
      console.log("URL: " + api_get_url);
      axios
        .get(api_get_url)
        .then(function(respuesta) {
          vm.datos_cliente = respuesta.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cambiarModoEdicion: function() {
      if (vm.editando == true) {
        vm.editando = false;
      } else {
        vm.editando = true;
      }
    },
    actualizarCliente: function() {
      var api_put_url =
        "http://172.18.14.82:8989/api/bimaestrotarjeta/update/rut/" +
        vm.rut_cliente;
      console.log("URL: " + api_put_url);
      axios
        .put(api_put_url, { pan: vm.nuevo_pan })
        .then(response => {
          this.datos_cliente.pan = this.nuevo_pan;
          this.cambiarModoEdicion();
          vm.nuevo_pan = "";
        })
        .catch(function(error) {
          console.log(error);
          if (error == "Error: Request failed with status code 400") {
            alert("El largo del PAN debe ser de 16 digitos.");
          }
          if (error == "Error: Network Error") {
            alert(
              "El servidor de API se encuentra inalcanzable. Comuniquese con Rene Berrios."
            );
          }
          vm.nuevo_pan = "";
        });
    },
    setActive: function() {
      $("#liPan").addClass("active liActive");
    }
  }
});
