function headerHTML () {
    let headerDOM = document.querySelector ("header");
    headerDOM.innerHTML = `<nav class="bg-danger text-light" id="sidebar-wrapper">
                           <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom font-title">Prestamos</div>
                           <div class="list-group list-group-flush my-3">
                           <a href="index.html" class="text-light list-group-item list-group-item-action bg-transparent second-text"><i class="fa fa-house mr-2"></i>Inicio</a>
                           <a href="prestamos.html" class="text-light list-group-item list-group-item-action bg-transparent second-text"><i class="fa fa-vault mr-2"></i>Prestamos</a>
                           <a href="actividad.html" class="text-light list-group-item list-group-item-action bg-transparent second-text"><i class="fa fa-book mr-2"></i>Actividad</a>
                           <a href="cotizacion.html" class="text-light list-group-item list-group-item-action bg-transparent second-text"><i class="fa fa-dollar-sign mr-2"></i>Cotización Dolar</a>
                           </div>
                           </nav>`;
}

headerHTML();
