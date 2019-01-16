//clase QintoCar - nueva forma
class QuintoCar {
  constructor(){
	this.clientes=[];
	this.ventas=[];
	this.compras=[];
	this.vehiculos=[];
  }

  //metodos
  altaCliente(oCliente){
  	//no puede haber dos clientes con el mismo nif
    var resultado="El cliente ya exite.";
    if (this.buscarCliente(oCliente.nif)==null) {
        this.clientes.push(oCliente);
        resultado="Cliente dado de alta.";
    }
        return resultado;
  	//devuelve string
  }

  altaVehiculo(oVehiculo){
  	//no puede haber dos vehiculos con la misma matricula
    var resultado="El vehículo ya exite.";
    if (this.buscarVehiculo(oVehiculo.matricula)==null) {
        this.vehiculos.push(oVehiculo);
        resultado="Vehículo dado de alta.";
    }
        return resultado;
  	//devuelve string
  }

  buscarCliente(sNif){
  	var oCliente = null;
    var array=this.clientes.filter(cliente => cliente.nif == sNif);
    if (array.length>0)
        oCliente=array[0];
    return oCliente;
  	//devuelve oCliente si está o nulo si no está en la tabla
  }

  buscarVehiculo(sMatricula){
  	var oVehiculo = null;
    var array=this.vehiculos.filter(vehiculo => vehiculo.matricula == sMatricula);
    if (array.length>0)
        oVehiculo=array[0];
    return oVehiculo;
  	//devuelve oVehiculo si está o nulo si no está en la tabla
  }

  buscarCompra(oVehiculo){
  	var oCompra=null;
  	var array=this.compras.filter(compra=>compra.vehiculo==oVehiculo);
  	if(array.length>0)
  		oCompra=array[0];
  	return oCompra;
  	//devuelve oCompra
  }

  buscarVenta(oVehiculo){
  	var oVenta=null;
  	var array=this.ventas.filter(venta=>venta.vehiculo==oVehiculo);
  	if(array.length>0)
  		oVenta=array[0];
  	return oVenta;
  	//devuelve oVenta
  }

  comprar(sMatricula,sNif,fImporteCompra,fechaCompra){
  	//devuelve string
  	var resultado="";
	var oCliente=this.buscarCliente(sNif);
	if (oCliente==null) {				//El cliente ya esté registrado
        resultado="El Cliente no existe."
    }else{				//La matrícula sea la de un vehículo registrado
     	var oVehiculo=this.buscarVehiculo(sMatricula);
     	if(oVehiculo==null){
     		resultado="El vehiculo no existe.";
     	}else{				//El vehículo no se haya comprado o vendido anteriormente
     		if(this.buscarVenta(oVehiculo)!=null){
     			restultado="El vehículo ya fue vendido.";
     		}else if(this.buscarCompra(oVehiculo)!=null){
     			resultado="El vehículo ya fue comprado";
     		} else{
     		 resultado="Compra realizada";
     		 this.compras.push(new Compra(oCliente,oVehiculo,fImporteCompra,fechaCompra));
     		}
     	}
    }
	return resultado;
  }

  vender(sMatricula,sNif,fImporteVenta,fechaVenta){
  	//devuelve string
  	var resultado="";
	var oCliente=this.buscarCliente(sNif);
	if (oCliente==null) {				//El cliente ya esté registrado
        resultado="El Cliente no existe."
    }else{			//La matrícula sea la de un vehículo registrado
     	var oVehiculo=this.buscarVehiculo(sMatricula);
     	if(oVehiculo==null){
     		resultado="El vehiculo no existe.";
     	}else if(this.buscarVenta(oVehiculo)!=null){	//El vehículo no se haya vendido anteriormente
     		resultado="El vehiculo ya ha sido vendido.";
     	}else{
     		var oCompra=this.buscarCompra(oVehiculo);
     	 	if(oCompra==null){	//El vehiculo comprado anterioremente
     			resultado="El vehiculo no ha sido comprado.";
     		}else if(fImporteVenta<oCompra.importe){	//El importe sea superior al importe por el que se compró.
     				resultado="El impore de venta debe ser mayor que el de compra."
     			}else if(fechaVenta<oCompra.fecha){
     				resultado="La fecha de venta debe ser posterior a la fecha de compra."
     			}else{
     				resultado="Venta realizada";
     				this.ventas.push(new Venta(oCliente,oVehiculo,fImporteVenta,fechaVenta));
     			}
     	}
    }
    return resultado;
  }	

  listadoVehiculos(sTipo,sCombustible){
  	//devuelve tabla html
  	var sTabla='<h5>Filtros: '+sTipo+', '+sCombustible+'</h5><table class="table"><thead><tr>';
	sTabla+='<th scope="col">Matrícula</th>';
	sTabla+='<th scope="col">Marca</th>';
	sTabla+='<th scope="col">Modelo</th>';
	sTabla+='<th scope="col">Combustible</th>';
	sTabla+='<th scope="col">Tipo</th>';
	sTabla+='<th scope="col">ABS</th>';
	sTabla+='<th scope="col">Descapotable</th>';
	sTabla+='<th scope="col">Puertas</th>';
	sTabla+='<th scope="col">Pendiente</th>';
	sTabla+='</tr>';
	//Aplicar criterios.
	var arrayTipo=[];
	var arrayVehiculosFiltrados=[];
	if(sTipo!="all"){
		if(sTipo=="Turismo"){
			for(var i=0;i<this.vehiculos.length;i++)
				if(this.vehiculos[i] instanceof Turismo)
					arrayTipo.push(this.vehiculos[i]);
		}else
			for(var i=0;i<this.vehiculos.length;i++)
				if(this.vehiculos[i] instanceof V4x4)
					arrayTipo.push(this.vehiculos[i]);
		}else arrayTipo=this.vehiculos;
		if(sCombustible!="all"){
			for(var i=0;i<arrayTipo.length;i++){
				if(arrayTipo[i].combustible==sCombustible){
					arrayVehiculosFiltrados.push(arrayTipo[i]);
				}
			}
		}else arrayVehiculosFiltrados=this.vehiculos;
	//construccion tabla
	for(var i=0;i<arrayVehiculosFiltrados.length;i++){
		sTabla+=arrayVehiculosFiltrados[i].toString();
    }
	sTabla+='</thead><tbody>';
  	return sTabla;
  }

  listadoVendidosPeriodo(fechaInicio,fechaFin){
  	//devuelve tabla
  	var dInicio=new Date(fechaInicio);
  	var dFin=new Date(fechaFin);
  	//vehículo, fecha de compra, fecha de venta,
  	//importe de compra, importe de venta y beneficio (importe venta – importe compra).
  	var sTabla='<table class="table"><thead><tr>';
	sTabla+='<th scope="col">Matrícula</th>';
	sTabla+='<th scope="col">Fecha compra</th>';
	sTabla+='<th scope="col">Fecha venta</th>';
	sTabla+='<th scope="col">Importe compra</th>';
	sTabla+='<th scope="col">Importe venta</th>';
	sTabla+='<th scope="col">Beneficio</th>';
	sTabla+='</tr>';
	//busqueda de ventas
	var arrayVentasPeriodo=[];
	for(var i=0;i<this.ventas.length;i++){
		if(this.ventas[i].fecha>dInicio && this.ventas[i].fecha<dFin){
			arrayVentasPeriodo.push(this.ventas[i]);
		}
	}
	//Los registros del listado deben salir ordenados por fecha de venta ascendente.
	for(var i=0;i<(arrayVentasPeriodo.length-1);i++){
		for(var j=i+1;j<arrayVentasPeriodo.length;j++){
			if(arrayVentasPeriodo[i].fecha>arrayVentasPeriodo[j].fecha)
				arrayVentasPeriodo.swap(i,j);
		}
	}
	//construccion tabla
	for(var i=0;i<arrayVentasPeriodo.length;i++){
		var oVehiculo=arrayVentasPeriodo[i].vehiculo;
		var oCompra=this.buscarCompra(oVehiculo);
		var beneficio=arrayVentasPeriodo[i].importe-oCompra.importe;
		var sFila="<tr>";
		sFila+="<td>"+oVehiculo.matricula+"</td>";
		sFila+="<td>"+oCompra.fecha+"</td>";
		sFila+="<td>"+arrayVentasPeriodo[i].fecha+"</td>";
		sFila+="<td>"+oCompra.importe+"</td>";
		sFila+="<td>"+arrayVentasPeriodo[i].importe+"</td>";
		sFila+="<td>"+beneficio+"</td>";
		sFila+="</tr>";
		sTabla+=sFila;
	}
	sTabla+='</thead><tbody>';
  	return sTabla;
  }

  listadoComprasPeriodo(fechaInicio,fechaFin){
  	//devuelve tabla
  	var dInicio=new Date(fechaInicio);
  	var dFin=new Date(fechaFin);
  	//vehículo, fecha de compra, importe de compra y datos del cliente vendedor. 
  	var sTabla='<table class="table"><thead><tr>';
	sTabla+='<th scope="col">Matrícula</th>';
	sTabla+='<th scope="col">Fecha compra</th>';
	sTabla+='<th scope="col">Importe compra</th>';
	sTabla+='<th scope="col">NIF cliente</th>';
	sTabla+='</tr>';
	//busqueda de compras
	var arrayComprasPeriodo=[];
	for(var i=0;i<this.compras.length;i++){
		if(this.compras[i].fecha>dInicio && this.compras[i].fecha<dFin){
			arrayComprasPeriodo.push(this.compras[i]);
		}
	}
	//Los registros del listado deben salir ordenados por fecha de compra descendente.
	for(var i=0;i<(arrayComprasPeriodo.length-1);i++){
		for(var j=i+1;j<arrayComprasPeriodo.length;j++){
			if(arrayComprasPeriodo[i].fecha<arrayComprasPeriodo[j].fecha)
				arrayComprasPeriodo.swap(i,j);
		}
	}
	//construccion tabla
	for(var i=0;i<arrayComprasPeriodo.length;i++){
		var sFila="<tr>";
		sFila+="<td>"+arrayComprasPeriodo[i].vehiculo.matricula+"</td>";
		sFila+="<td>"+arrayComprasPeriodo[i].fecha+"</td>";
		sFila+="<td>"+arrayComprasPeriodo[i].importe+"</td>";
		sFila+="<td>"+arrayComprasPeriodo[i].cliente.nif+"</td>";
		sFila+="</tr>";
		sTabla+=sFila;
	}
	sTabla+='</thead><tbody>';
  	return sTabla;
  }

  listadoALaVenta(){
  	//devuelve tabla
  	var sTabla='<table class="table"><thead><tr>';
	sTabla+='<th scope="col">Matrícula</th>';
	sTabla+='<th scope="col">Marca</th>';
	sTabla+='<th scope="col">Modelo</th>';
	sTabla+='<th scope="col">Combustible</th>';
	sTabla+='<th scope="col">Tipo</th>';
	sTabla+='<th scope="col">ABS</th>';
	sTabla+='<th scope="col">Descapotable</th>';
	sTabla+='<th scope="col">Puertas</th>';
	sTabla+='<th scope="col">Pendiente</th>';
	sTabla+='</tr>';
	//aquellos que hemos comprado, pero aún no hemos vendido.
	for(var i=0;i<this.vehiculos.length;i++){
		if(this.buscarCompra(this.vehiculos[i])!=null && this.buscarVenta(this.vehiculos[i])==null)
           	sTabla+=this.vehiculos[i].toString();
    }
	sTabla+='</thead><tbody>';
  	return sTabla;
  }

  listadoClientes(){
  	//ordenacion Clientes antes de mostrar
  	//ordenado por apellidos ascendentemente.
	for(var i=0;i<(this.clientes.length-1);i++){
		for(var j=i+1;j<this.clientes.length;j++){
			if(this.clientes[i].apellidos>this.clientes[j].apellidos)
				this.clientes.swap(i,j);
		}
	}
	//devuelve tabla
	var sTabla='<table class="table"><thead><tr>';
	sTabla+='<th scope="col">NIF</th>';
	sTabla+='<th scope="col">Nombre</th>';
	sTabla+='<th scope="col">Apellidos</th>';
	sTabla+='<th scope="col">Telefono</th>';
	sTabla+='</tr>';
		//cada cliente en fila
		for(var i=0;i<this.clientes.length;i++){
            sTabla+=this.clientes[i].toString();
        }
	sTabla+='</thead><tbody>';
  	return sTabla;
  }
}

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}

//clase cliente - antigua forma
function Cliente(sNif,sNombre,sApellidos,iTelefono){
	this.nif=sNif;
	this.nombre=sNombre;
	this.apellidos=sApellidos;
	this.telefono=iTelefono;
}
Cliente.prototype.toString=function(){
	//devuelve fila tabla
	var sFila="<tr>";
	sFila+="<td>"+this.nif+"</td>";
	sFila+="<td>"+this.nombre+"</td>";
	sFila+="<td>"+this.apellidos+"</td>";
	sFila+="<td>"+this.telefono+"</td>";
	sFila+="</tr>";
	return sFila;
}

//clase venta - antigua forma
function Venta(oCliente,oVehiculo,fImporte,fechaVenta){
	this.cliente=oCliente;
	this.vehiculo=oVehiculo;
	this.importe=fImporte;
	this.fecha=fechaVenta;
}
Venta.prototype.toString=function(){
	//fila tabla
	var sFila="<tr>";
	sFila+="<td>"+this.cliente.nif+"</td>";
	sFila+="<td>"+this.vehiculo.matricula+"</td>";
	sFila+="<td>"+this.importe+"</td>";
	sFila+="<td>"+this.fecha+"</td>";
	sFila+="</tr>";
	return sFila;
}

//clase compra - antigua forma
function Compra(oCliente,oVehiculo,fImporte,fechaCompra){
	this.cliente=oCliente;
	this.vehiculo=oVehiculo;
	this.importe=fImporte;
	this.fecha=fechaCompra;
}
Compra.prototype.toString=function(){
	//fila tabla
	var sFila="<tr>";
	sFila+="<td>"+this.cliente.nif+"</td>";
	sFila+="<td>"+this.vehiculo.matricula+"</td>";
	sFila+="<td>"+this.importe+"</td>";
	sFila+="<td>"+this.fecha+"</td>";
	sFila+="</tr>";
	return sFila;	
}

Date.prototype.toString=function(){
	var dia=this.getDate();
	var mes=this.getMonth()+1;
	var anio=this.getFullYear();
	var sCadena=dia+"/"+mes+"/"+anio;
	return sCadena;
}

//clase vehiculo - antigua forma
function Vehiculo(sMatricula,sMarca,sModelo,sCombustible){
	this.matricula=sMatricula;
	this.marca=sMarca;
	this.modelo=sModelo;
	this.combustible=sCombustible;
}
Vehiculo.prototype.toString=function(){
	//fila tabla
}

//clase turismo - antigua forma - es un vehiculo
function Turismo(sMatricula,sMarca,sModelo,sCombustible,bABS,bDescapotable,iPuertas){
	Vehiculo.apply(this,[sMatricula,sMarca,sModelo,sCombustible]);
	this.abs=bABS;
	this.descapotable=bDescapotable;
	this.numPuertas=iPuertas;
}

Turismo.prototype=Object.create(Vehiculo.prototype);
Turismo.prototype.constructor=Turismo;

Turismo.prototype.toString=function(){
	//fila tabla
	var sFila="<tr>";
	sFila+="<td>"+this.matricula+"</td>";
	sFila+="<td>"+this.marca+"</td>";
	sFila+="<td>"+this.modelo+"</td>";
	sFila+="<td>"+this.combustible+"</td>";
	sFila+="<td>Turismo</td>";
	if(this.abs)
		sFila+="<td>Sí</td>";
	else
		sFila+="<td>No</td>";
	if(this.descapotable)
		sFila+="<td>Sí</td>";
	else
		sFila+="<td>No</td>";
	sFila+="<td>"+this.numPuertas+"</td>";
	sFila+="<td>-</td>";
	sFila+="</tr>";
	return sFila;	
}

//clase v4x4 - antigua forma - es un vehiculo
function V4x4(sMatricula,sMarca,sModelo,sCombustible,iPendienteMax){
	Vehiculo.apply(this,[sMatricula,sMarca,sModelo,sCombustible]);
	this.pendienteMax=iPendienteMax;
}

V4x4.prototype=Object.create(Vehiculo.prototype);
V4x4.prototype.constructor=V4x4;

V4x4.prototype.toString=function(){
	//fila tabla
	var sFila="<tr>";
	sFila+="<td>"+this.matricula+"</td>";
	sFila+="<td>"+this.marca+"</td>";
	sFila+="<td>"+this.modelo+"</td>";
	sFila+="<td>"+this.combustible+"</td>";
	sFila+="<td>4x4</td>";
	sFila+="<td>-</td>";
	sFila+="<td>-</td>";
	sFila+="<td>-</td>";
	sFila+="<td>"+this.pendienteMax+"</td>";
	sFila+="</tr>";
	return sFila;	
}