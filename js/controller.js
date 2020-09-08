var app = angular.module('maquetaTest.controller', []);
  app.controller('maquetaCtrl', ['$scope','$http',  function($scope, $http){  	

  	$scope.data = []

  	//paginacion
  	$scope.itemsForPag = 10;
  	$scope.totalPag = 0;
  	$scope.parCurrent = 1;

  	$scope.edit = false;
  	$scope.checkedVisto = false;
  	$scope.checkedNoVisto = false;
  	$scope.visto = 0;
  	$scope.noVisto = 0;

	//carga dato info
	$scope.dataEdit = {};

	//pag siguiente
	$scope.nextPag = function(){
		if($scope.data.length > $scope.itemsForPag){
			$scope.itemsForPag += 10;
			$scope.parCurrent += 1
		
		}
	};

	//pag anterio
	$scope.backPag = function(){
		if($scope.itemsForPag > 10){
			$scope.itemsForPag -= 10;
			$scope.parCurrent -= 1
		}
	};


	//cargando la informacion para editar
  	$scope.loadInfoEdit = function(id){ 
		$scope.edit = true;
		angular.forEach($scope.data, 
			function(value, key){
				if ($scope.data[key].id == id){
				  	$scope.checkedVisto = ($scope.data[key].checked == 'visto') ? true : false;
				  	$scope.checkedNoVisto = ($scope.data[key].checked == 'no visto') ? true : false;
					angular.copy($scope.data[key], $scope.dataEdit);
				}
			}
		);
  	};

  	//modificando el objecto
  	$scope.saveInfo = function(){
  		$scope.edit = false;
		angular.forEach($scope.data, 
			function(value, key){
				if ($scope.data[key].id == $scope.dataEdit.id){
					angular.copy($scope.dataEdit, $scope.data[key]);
				}
			}
		);
  		$scope.cuontCheckd($scope.data);
  	}  	

  	$scope.cuontCheckd = function(array){
  		$scope.noVisto =0;
  		$scope.visto =0;
  		angular.forEach(array, 
  			function(value, key){
  				if (array[key].checked == 'visto') {
  					$scope.visto += 1;
  				} else if(array[key].checked == 'no visto'){
  					$scope.noVisto +=1;
  				}
  			}
  		);
	};

	//carga la data
	$scope.cargarData = function(){
		$http.get('resource/data.json')
			.then(function(response){
				$scope.data = response.data.events;
				$scope.totalPag = Math.ceil($scope.data.length / $scope.itemsForPag);
				$scope.cuontCheckd($scope.data);
			}).catch(function(responseError){
				console.error(responseError,'Error cargando el archivo')
			});
	};
	$scope.cargarData();

  }]);

