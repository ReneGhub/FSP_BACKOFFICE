var navBar = new Vue({
  el: "#testNav",
  data: {
    HTMLcontent: null
  },
  created() {
    this.HTMLcontent = `
        <nav class="navbar sticky-top navbar-expand-sm navbar-dark bg-fashionsPark bottomBorder">

        <div class="container">
            <a href=" "><img src="https://www.fashionspark.com/img/fashions-park-logo-1538399650.jpg"
                alt="logo fashions park" width="250"></a>

        <!-- TOGGLER BUTTON -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- NAV -->
        <div class="collapse justify-content-end navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <!--<li id="liPan" class="nav-item">
                    <a class="nav-link" href="Pan.html">PAN</a>
                </li>-->
                <li id="liTransacciones" class="nav-item dropdown">

                    <a id="liTxtTransacciones" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Transacciones
                    </a>
                    <div class="dropdown-menu bg-fashionsPark" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item text-light customHover" href="Transacciones.html">Transacciones
                            Historicas</a>
                        <a class="dropdown-item text-light customHover"
                            href="TransaccionesOnline.html">Transacciones
                            Diarias
                        </a>
                    </div>
                </li>
                <!--<li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        User
                    </a>
                    <div class="dropdown-menu bg-darkBlue" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item text-light customHover" href="#">
                            <i class="fa fa-user"></i> Perfil</a>
                        <a class="dropdown-item text-light customHover" href="#">
                            <i class="fa fa-sign-out"></i>Desconectarse</a>
                    </div>
                </li>-->
            </ul>
        </div>
    </div>
</nav>
	`;
  }
});

var ddTienda = new Vue({
  el: "#ddTienda",
  data: {
    HTMLcontent: null
  },
  created() {
    this.HTMLcontent = `
    <select v-model:value="tiendaId" v-model="optionDefault" id="slctTienda"
    @change="cargarTransaccionesByTienda" class="form-control customSelect">
        <option value="SEL">Seleccione Tienda...</option>
        <option v-for="tienda in tiendas" :value="tienda.codigo_tienda">
            {{ tienda.nombre_tienda }} -
            [{{ tienda.codigo_tienda }}] </option>
        <!--<option value="ALL">Todos</option>-->
    </select>`;
  }
});
