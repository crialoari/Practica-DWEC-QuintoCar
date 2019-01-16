var oQuintoCar=new QuintoCar();

datosIniciales();

function datosIniciales() {
	oQuintoCar.altaCliente(new Cliente("12312312F","Alberto","Gómez Gómez",666626262));
	oQuintoCar.altaCliente(new Cliente("47586921G","María","Jiménez Jiménez",666518475));
	oQuintoCar.altaCliente(new Cliente("28591456Y","Jesús","Castañas Castañas",666875421));

	oQuintoCar.altaVehiculo(new Turismo("SE4718JK","Ford","Focus","Gasolina",true,false,5));
	oQuintoCar.altaVehiculo(new Turismo("SE6248BV","Peugeot","206","Diesel",false,false,4));
	oQuintoCar.altaVehiculo(new V4x4("CA3648GH","Jeep","Compass","Biocombustible",12));
	oQuintoCar.altaVehiculo(new V4x4("1759FRY","Jeep","Renegade","Diesel",15));

	oQuintoCar.comprar("SE4718JK","12312312F",5000,new Date("2017-03-12"));
	oQuintoCar.comprar("SE6248BV","47586921G",10000,new Date("2017-04-15"));
	oQuintoCar.comprar("CA3648GH","28591456Y",8400,new Date("2017-07-22"));

	oQuintoCar.vender("SE4718JK","12312312F",6500,new Date("2017-04-20"));
	oQuintoCar.vender("SE6248BV","47586921G",15000,new Date("2017-06-01"));
}

frmAltaVehiculo.radioTurismo.addEventListener("change",seleccionVehiculo,false);
frmAltaVehiculo.radio4x4.addEventListener("change",seleccionVehiculo,false);

function seleccionVehiculo(){
	if(frmAltaVehiculo.radioTurismo.checked){
		document.getElementById("opcionesTurismo").classList.remove('d-none');
		document.getElementById("opcionesV4x4").classList.add('d-none');
	}else{
		document.getElementById("opcionesTurismo").classList.add('d-none');
		document.getElementById("opcionesV4x4").classList.remove('d-none');
	}
}

function ocultarFormularios(){
	document.getElementById("bienvenida").classList.add('d-none');
	document.getElementById("divAltaCliente").classList.add('d-none');
	document.getElementById("divAltaVehiculo").classList.add('d-none');
	document.getElementById("divCompraVehiculo").classList.add('d-none');
	document.getElementById("divVentaVehiculo").classList.add('d-none');
	document.getElementById("divListVendidos").classList.add('d-none');
	document.getElementById("divListComprados").classList.add('d-none');
	document.getElementById("divListVehiculos").classList.add('d-none');
}

function mostrarFrm(idCapa){
	ocultarFormularios();
	document.getElementById(idCapa).classList.remove('d-none');
}

function altaCliente(){
	var sNif = frmAltaCliente.txtNIF.value.trim();
	var sNombre = frmAltaCliente.txtNombre.value.trim();
	var sApellidos = frmAltaCliente.txtApellidos.value.trim();
	var iTelefono = parseInt(frmAltaCliente.txtTelefono.value.trim(), 10);
    mensaje(oQuintoCar.altaCliente(new Cliente(sNif,sNombre,sApellidos,iTelefono)));
    frmAltaCliente.reset();
}

function altaVehiculo(){
	var sMatricula=frmAltaVehiculo.txtMatricula.value.trim();
	var sMarca=frmAltaVehiculo.txtMarca.value.trim();
	var sModelo=frmAltaVehiculo.txtModelo.value.trim();
	var sCombustible=frmAltaVehiculo.selectCombustible.value.trim();
	if(frmAltaVehiculo.radioTurismo.checked){
		var bABS=frmAltaVehiculo.chkbxABS.checked;
		var bDescapotable=frmAltaVehiculo.chkbxDescapotable.checked;
		var iPuertas=parseInt(frmAltaVehiculo.txtnPuertas.value.trim(), 10);
		mensaje(oQuintoCar.altaVehiculo(new Turismo(sMatricula,sMarca,sModelo,sCombustible,bABS,bDescapotable,iPuertas)));
	}else{
		var iPendienteMax=parseInt(frmAltaVehiculo.txtPendiente.value.trim(), 10);
		mensaje(oQuintoCar.altaVehiculo(new V4x4(sMatricula,sMarca,sModelo,sCombustible,iPendienteMax)));
	}
	frmAltaVehiculo.reset();
}

function compraVehiculo(){
	var sMatricula=frmCompraVehiculo.txtVehiculoCompra.value.trim();
	var sNif=frmCompraVehiculo.txtClienteCompra.value.trim();
	var fImporteCompra=parseFloat(frmCompraVehiculo.txtImporteCompra.value.trim());
	var fechaCompra=new Date(frmCompraVehiculo.fechaCompra.value);
	mensaje(oQuintoCar.comprar(sMatricula,sNif,fImporteCompra,fechaCompra));
	frmCompraVehiculo.reset();
}

function ventaVehiculo(){
	var sMatricula=frmVentaVehiculo.txtVehiculoVenta.value.trim();
	var sNif=frmVentaVehiculo.txtClienteVenta.value.trim();
	var fImporteVenta=parseFloat(frmVentaVehiculo.txtImporteVenta.value.trim());
	var fechaVenta=new Date(frmVentaVehiculo.fechaVenta.value);
	mensaje(oQuintoCar.vender(sMatricula,sNif,fImporteVenta,fechaVenta));
	frmVentaVehiculo.reset();
}

function mensaje(sTexto) {
    alert(sTexto);
}