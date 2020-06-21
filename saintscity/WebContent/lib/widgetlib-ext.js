
/**
 * Creates fields for Account Information widget:
 * 
 * @param fieldList -
 *            list of fields written in a JSON format, key = field label, value =
 *            field type(listed below) 0 = default 1 = required 2 = date picker
 *            3 = disabled text
 * @param wrapper -
 *            div element that will hold the generated fields.
 * 
 * Note: This function uses widgetlib.js
 */
var services;

var txnTblConfigMyOrder = ["transactionId","serviceName","transactionDate","transactionStatus"];
var txnTblConfigProxy = ["transactionId","serviceName","transactionDate","transactionStatus","orderedByName", "clientName"];

var objPerm = {};

var globalProxyEmail;

var txnTblConfigMyProxy = ["proxyName","proxyEmail","proxyNumber","status","",""];
var txnTblConfigProxyFor = ["mainName","mainEmail","mainNumber","status","",""];

function createTblRep(jsonObject, isMyProxy){
	console.log(jsonObject.length);
	if(jsonObject.length != 0){
		var table = document.createElement("table");
		$(table).addClass('table-representative animateProfile');
		
		var thead = table.createTHead();
		var tr = thead.insertRow(-1); 
		var txnTblConfigRep;
		if(isMyProxy == true){
			txnTblConfigRep = txnTblConfigMyProxy;
		} else {
			txnTblConfigRep = txnTblConfigProxyFor;
		}
		
		for (var i = 0; i < txnTblConfigRep.length; i++) {
			var th = document.createElement("th"); // TABLE HEADER.
			var headerName = null;
			var headerName = txnTblConfigRep[i];
			var result = headerName.replace( /([A-Z])/g, " $1" );
			var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
			th.innerHTML = finalResult;

			if(txnTblConfigRep[i] == 'proxyNumber'){
				headerName = 'Proxy Contact Number';
				th.innerHTML = headerName;
			} else if(txnTblConfigRep[i] == 'mainNumber'){
				headerName = 'Main Contact Number';
				th.innerHTML = headerName;
			} else {
				headerName = txnTblConfigRep[i];
				var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
				th.innerHTML = finalResult;
			}
			
			
			
	// th.innerHTML = col[i]; orig
			if(headerName == 'transactionId'){
				txIDIndex = i;
			}
			
			if(headerName.toLowerCase().indexOf('date')>-1){
				dateIndices.push(i);
			}
			tr.appendChild(th);
		}
		
		var tbody = document.createElement("tbody");
		$(table).append(tbody);
		console.log(jsonObject);
		for (var i = 0; i < jsonObject.length; i++) {
			tr = tbody.insertRow(-1);
			var tabCell1 = tr.insertCell(-1);
			var tabCell2 = tr.insertCell(-1);
			var tabCell3 = tr.insertCell(-1);
			var tabCell4 = tr.insertCell(-1);
			var tabCell5 = tr.insertCell(-1);
//			var tabCell6 = tr.insertCell(-1);
			
			
			
			
	// alert(jsonObject[i].hasOwnProperty('proxyUuid'));
			if(jsonObject[i].hasOwnProperty('proxyUuid')){
				if(jsonObject[i].accepted){
					tabCell4.innerHTML = "Active";
					tabCell5.innerHTML = "";
				} else {
					tabCell4.innerHTML = "Not Accepted";
					var lbl = document.createElement("label");
					$(lbl).text("Resend Invitation");
					tabCell5.append(lbl);
					$(tabCell5).on('click', function() {
						var repreWdgt = profileWdgt.getWidgets().repreWdgt;
						var obj = repreWdgt.getTableValues();
						var obj2 = getMainUuidDetails();
						var i = $(this).closest('tr').index();
						var objFinal = $.extend({}, obj[i], obj2);
						console.log(objFinal);
						loadingWdgt.show("Sending email..");
						ajaxInviteEmailProxy("request", JSON.stringify(objFinal), function(){
							loadingWdgt.hide();
							successWdgt.setText("Success", "Successfully resend to: " + objFinal.proxyEmail);
							successWdgt.show();
						});
					});
				}
			} else {
				tabCell4.innerHTML = "Inactive";
				var lbl = document.createElement("label");
				$(lbl).text("Resend Invitation");
				tabCell5.append(lbl);
				$(tabCell5).on('click', function() {
					var repreWdgt = profileWdgt.getWidgets().repreWdgt;
					var obj = repreWdgt.getTableValues();
					var obj2 = getMainUuidDetails();
					var i = $(this).closest('tr').index();
					var objFinal = $.extend({}, obj[i], obj2);
					console.log(objFinal);
					loadingWdgt.show("Sending email..");
					ajaxInviteEmailProxy("new", JSON.stringify(objFinal), function(){
						loadingWdgt.hide();
						successWdgt.setText("Success", "Successfully resend to: " + objFinal.proxyEmail);
						successWdgt.show();
					});
				});
			}
			
			var lblEdit = document.createElement("label");
			var lblDelete = document.createElement("label");

			$(lblEdit).append("EDIT");
			$(lblDelete).append("DELETE");
			
			$(lblEdit).on('click', function() {
				modalAddProxyWdgt.setMode('edit');
				var objToShow = {};
				objToShow.email = $(this).parent().parent().find("td:nth-child(2)").text();
				objToShow.name = $(this).parent().parent().find("td:nth-child(1)").text();
				objToShow.number = $(this).parent().parent().find("td:nth-child(3)").text();
				modalAddProxyWdgt.show(objToShow);
			});
			
			
			$(lblDelete).on('click', function() {
				globalProxyEmail = $(this).parent().parent().find("td:nth-child(2)").text();
				console.log(globalProxyEmail);
				confirmWdgt.setText('Concierge', 'Do you want to delete this proxy?');
				confirmWdgt.setDelegate(function(){
	// var email = $(this).parent().parent().find("td:nth-child(2)").text();
					var pid = userID;
					var dataToPush = {};
					dataToPush.mainUuid = pid;
					dataToPush.proxyEmail = globalProxyEmail;
					var url = DELETE_PROXY_URL + $.param(dataToPush);
					$.ajax({
						url: url,
						method: 'DELETE',
						success: function(result) {
							successWdgt.setText('Concierge', 'Proxy User has been deleted.');
							successWdgt.show();
							$("#pRepreBtn").trigger("click");
						},
						error: function(){
							errorWdgt.setText('Error', "Unable to delete Proxy User");
							errorWdgt.show();
						}
					});
				});
				confirmWdgt.show();
			});
			
//			if(!jsonObject[i].accepted){
//				$(tabCell6).append(lblEdit);
//				$(tabCell6).append(" ");
//			}
			
			
			
			if(isMyProxy == true){
				tabCell1.innerHTML = jsonObject[i].proxyName;
				tabCell2.innerHTML = jsonObject[i].proxyEmail;
				tabCell3.innerHTML = jsonObject[i].proxyNumber;
				var tabCell6 = tr.insertCell(-1);
				if(!jsonObject[i].accepted){
					$(tabCell6).append(lblEdit);
					$(tabCell6).append(" ");
				}
				$(tabCell6).append(lblDelete);
			} else {
				tabCell1.innerHTML = jsonObject[i].mainName;
				tabCell2.innerHTML = jsonObject[i].mainEmail;
				tabCell3.innerHTML = jsonObject[i].mainNumber;
			}
		
		}

		return table;
	} else {
		var wrap = document.createElement('div');
		
		var img = generateErrorImg();
		var msg = generateErrorMsg();

		$(wrap).addClass('curTxWrap');
		
		$(wrap).append(img);
		$(wrap).append(msg);
		
		return wrap;
	}
	
}

function getMainUuidDetails(){
	var obj = {}
	obj["mainUuid"] = userID;
	obj["mainName"] = firstName + " " + middleName + " " + lastName + " " + nameSuffix;
	obj["mainEmail"] = emailAddress;
	obj["mainNumber"] = contactNumber;
	return obj;
}

function buildTable(jsonObject, isProxyOrder){
	var txnTblConfig = [];
	if(!isProxyOrder){
		txnTblConfig = txnTblConfigMyOrder;
	} else {
		txnTblConfig = txnTblConfigProxy;
	}
	
	var objPerm = jsonObject;
	
	var col = [];

	if(jsonObject.length > 0){
		var txIDIndex;
		var dateIndices = [];
		for (var i = 0; i < jsonObject.length; i++) {
			for (var key in jsonObject[i]) {
				if (col.indexOf(key) === -1) {
					col.push(key);
				}
			}
		}

		var table = document.createElement("table");
		$(table).addClass('tableStyle animateProfile');

		
		
		var thead = table.createTHead();
		var tr = thead.insertRow(-1); 
		
		for (var i = 0; i < txnTblConfig.length; i++) {
			var th = document.createElement("th"); // TABLE HEADER.
// $(th).addClass('thStyle');

			var headerName = null;
			console.log(txnTblConfig[i]);
			if(txnTblConfig[i] == 'orderedByName'){
				var headerName = 'Ordered By';
			} else if(txnTblConfig[i] == 'clientName'){
				var headerName = 'Ordered For';
			} else {
				var headerName = txnTblConfig[i];
			}
			var result = headerName.replace( /([A-Z])/g, " $1" );
			var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
			th.innerHTML = finalResult;

// th.innerHTML = col[i]; orig
			if(headerName == 'transactionId'){
				txIDIndex = i;
			}
			
			if(headerName.toLowerCase().indexOf('date')>-1){
				dateIndices.push(i);
			}
			

			tr.appendChild(th);
		}
		
		var tbody = document.createElement("tbody");
		$(table).append(tbody);
		// ADD JSON DATA TO THE TABLE AS ROWS.
		for (var i = 0; i < jsonObject.length; i++) {
			var id = jsonObject[i].personCompId;
			tr = tbody.insertRow(-1);
			$('.hoverRow').removeClass('hoverRow');
			$(tr).addClass('hoverRow');
			$(tr).on('click', function() {
				isDraft = true;
				var loadingScreen = $.extend(true, {}, new LoadingScreen());
				$('.body').append(loadingScreen.asWidget());
				loadingScreen.show("Loading transaction info...");
				var txId = $(this).find("td:eq(" + txIDIndex + ")").text(); // Transaction
																			// ID
				var svcName = $(this).find("td:eq(1)").text(); // Service Name
				TRANSATION_ID_GLOBAL = txId;
				
				let paymentStat = "";
				
// var url =
// 'http://18.207.60.176:8080/transaction-webservice/rest/transaction/transDetails?pid='+
// id +'&txnid=' + txId;
				var url = CURRENT_TRANSACTION_MODAL + objPerm[$("tr").index(this) - 1].personCompId +'&txnid=' + txId;
				var personCompId = objPerm[$("tr").index(this) - 1].personCompId;
				$.ajax({
					url: url,
					method: 'GET',
					success: function(result) {
						if(result){			
							var dataForInvoice = result;
							var modal = $.extend(true, {}, new TransactionHistModal()); 
							
							console.log(personCompId);
							modal.setUserId(personCompId);

							// Add transaction files
							
							ajaxTransAppForm(personCompId,txId,function(returnForm) {
								modal.setConfig(returnForm);
							}, function(returnVal){
								var uploaded = [];
								var dataFromReturnVal = returnVal["Data"];
				
								var uploads = returnVal["Data"]['uploads'];
								if(uploads){
									if($.isArray(uploads)) {
										$.each( uploads, function( key, value ) {
											uploaded.push(value.name)
										});
									}else{
										uploaded.push(uploads.name);
									}
								}
								modal.listFiles(uploaded);
								modal.setDraft(returnVal);
								
// modal.show();
								console.log(result);
								
								$.ajax({
									url:PAYMENT_STAT_URL + txId,
									method: 'GET',
									success: function(response){
										paymentStat = response.status;
									},
									error: function(xhr,text,error){
										console.log("Error retrieving payment status")
									},
									complete: function() {
										modal.setVal(result.serviceName, result.transactionId, formatDate(result.transactionDate), result.transactionStatus, 
											returnVal["Data"]["ordered_by_name"], paymentStat );
										$(modal.getContBtn()).on('click', function(){
											
											$.ajax({
												url:SERVICES_FORM_CONFIG_URL+"/service/"+svcName,
												success: function(response){
													applicationModal.setCurrentStep(0);
													applicationModal.setConfig(response);
													var data = modal.getDraft();
													var dataTag = data["Data"];
													pIdToApply = personCompId;
													applicationModal.setDraftData(data);
													repopulateWithRetrieved(dataTag);
		// repopulateWithRetrieved(modal.getDraft());
													modal.hide();
												},
												error: function(xhr,text,error){
		
													alert("error");
												}
											});		
										});
															
										
										ajaxTrxnFiles(id,txId,function(callback) {
											// processing the data
											loadingScreen.asWidget().remove();
											generateTransactionHistoryPortion(modal.getBody(),returnVal.Status);

											$('.body').append(modal.asWidget());
											try {
												if(returnVal.Details.transaction_status.toLowerCase() != 'draft saved'){
													var pickUpDetails = dataFromReturnVal.pickUpDetails;
													
													var pickUpAddress = pickUpDetails.selectedAddress;
													var selectedCourData = pickUpDetails.selectedCourData;
													var selectedCourPriceData = pickUpDetails.selectedCourPriceData;
													
													var deliveryDetails = dataFromReturnVal.deliveryDetails;
													
													var deliveryAddress = deliveryDetails.selectedAddress;
													var selectedCourData2 = deliveryDetails.selectedCourData;
													var selectedCourPriceData2 = deliveryDetails.selectedCourPriceData;
													generateTransactionInvoice(modal.getBody(), dataFromReturnVal.svc_name , pickUpAddress, pickUpDetails, selectedCourData, selectedCourPriceData, deliveryAddress, deliveryDetails, selectedCourData2, selectedCourPriceData2);
												}
											} catch (e) {
												
											}
											
											
											console.log(callback)
											modal.listFiles(callback);
		//loadingScreen.asWidget().remove();
										});
									}
								});	
								
								
								
							});
							
// loadingScreen.asWidget().remove();
							
							
							
							
							
						}else{
							loginWdgt.setLoginMessage('Unable to retrieve Account details.');
// loadingScreen.asWidget().remove();
						}
					}
				});
					
			})
			for (var j = 0; j < txnTblConfig.length; j++) {
				var tabCell = tr.insertCell(-1);
				if(j == txIDIndex){
					$(tabCell).prop('txID', true);
				}
				if(dateIndices.includes(j)){
					if(jsonObject[i][txnTblConfig[j]]){
// var dateMillis = Date.parse(jsonObject[i][txnTblConfig[j]]);
// var clonedDate = new Date(+dateMillis);
// var formattedDate = formatDate(clonedDate);
						
						var formattedDate = formatDateForHistory(jsonObject[i][txnTblConfig[j]]);
						tabCell.innerHTML = formattedDate;
						tabCell.innerHTML = formattedDate;
					}else{
						tabCell.innerHTML = 'TBD';
					}
				}
				else{
					tabCell.innerHTML = jsonObject[i][txnTblConfig[j]];
				}


			}
		}
		return table;
	}else{
		var wrap = document.createElement('div');
		
		var img = generateErrorImg();
		var msg = generateErrorMsg();

		$(wrap).addClass('curTxWrap');
		
		$(wrap).append(img);
		$(wrap).append(msg);
		
		return wrap;
	}
}

var sampleHistoryData = [
	{
		label: "RECEIVED",
		time: "10/05/2019"
	},{
		label: "PROCESSED",
		time: "10/06/2019"
	},{
		label: "FOR SHIPPING",
		time: "10/07/2019"
	},{
		label: "COMPLETED",
		time: "10/10/2019"
	}
];

function buildRadioButtonWithWrap(name,value,text,classOfInput) {
	var wrap = document.createElement("label");
	var radioBtn = document.createElement("input");
	$(radioBtn).addClass(classOfInput);
	$(radioBtn).attr("type", "radio");
	$(radioBtn).attr("name", name);
	$(radioBtn).attr("value", value);
	$(wrap).append(radioBtn);
	$(wrap).append(text);
	return wrap;
}

function generateTransactionInvoice(body,svc_name, pickUpDetailsAddress, pickUpDetails, selectedCourData, selectedCourPriceData, delivAddressDetails, deliveryDetails, selectedCourData2, selectedCourPriceData2){
	var historyHeaderElem = widgetGenerator.createHeader("TRANSACTION INVOICE STATEMENT");


//	console.log(result);
	var tableWidget;

	var pickUpAdress = generateAddressFromXMLData(pickUpDetailsAddress.address);
	var deliveryAdress = generateAddressFromXMLData(delivAddressDetails.address);

	$(body).append(historyHeaderElem);

	var historyBodyElem = document.createElement("div");
	var historyBodyElemContainer = document.createElement("div");
	
	$(historyBodyElemContainer).addClass('invoice-history-container');
	
	
	$(historyBodyElemContainer).append(generateHeaderLineInInvoice("Service Name : " + svc_name));	
	$(historyBodyElemContainer).append(generateHeaderLineInInvoice("Pick up Details"));	
	$(historyBodyElemContainer).append(generateLineInInvoice("Contact Name: ", pickUpDetailsAddress.addressContactName));	
	$(historyBodyElemContainer).append(generateLineInInvoice("Address : ", pickUpAdress));	
	$(historyBodyElemContainer).append(generateLineInInvoice("Contact Number : ", pickUpDetailsAddress.cpNo));	
	$(historyBodyElemContainer).append(generateLineInInvoice("Selected Date : ", pickUpDetails.selectedDate));
	$(historyBodyElemContainer).append(generateLineInInvoice("Selected Courier : ", selectedCourData.courierName));
	$(historyBodyElemContainer).append(generateLineInInvoice("Price : ", selectedCourPriceData.productPrice + " " + selectedCourPriceData.currency));
	$(historyBodyElemContainer).append(generateHeaderLineInInvoice("Delivery Details"));	
	$(historyBodyElemContainer).append(generateLineInInvoice("Contact Name: ", delivAddressDetails.addressContactName));	
	$(historyBodyElemContainer).append(generateLineInInvoice("Address : ", deliveryAdress));	
	$(historyBodyElemContainer).append(generateLineInInvoice("Contact Number : ", delivAddressDetails.cpNo));	
	$(historyBodyElemContainer).append(generateLineInInvoice("Selected Courier : ", selectedCourData2.courierName));
	$(historyBodyElemContainer).append(generateLineInInvoice("Price : ", selectedCourPriceData2.productPrice + " " + selectedCourPriceData2.currency));
	$(historyBodyElemContainer).append(generateHeaderLineInInvoice(" "));	
	
	var total = selectedCourPriceData2.productPrice + selectedCourPriceData.productPrice;
	$(historyBodyElemContainer).append(generateLineInInvoice("Total Price : ", total  + " " + selectedCourPriceData2.currency));

//	$(historyBodyElem).append(historyBodyElemContainer);
	$(body).append(historyBodyElemContainer);
}

function generateLineInInvoice(label, data){
	var wrap = document.createElement("div");
	var label1 = document.createElement("label");
	var data1 = document.createElement("label");

	$(label1).append(label);
	$(data1).append(data);

	$(wrap).append(label1);
	$(wrap).append(data1);

	return wrap;
}
function generateHeaderLineInInvoice(label){
	var wrap = document.createElement("div");
	var label1 = document.createElement("label");
	$(wrap).addClass('invoice-history-header');
	$(label1).append(label);

	$(wrap).append(label1);

	return wrap;
}

function generateAddressFromXMLData(_data){
	var stringToReturn = "";
	stringToReturn = _data.houseNo + " " + _data.street + " " + _data.brgy + " " + _data.city + " " + _data.province + " " + _data.country + " "+  _data.zipCode;
	return stringToReturn.trim();
}

function generateTransactionHistoryPortion(body, statHist){
	/* Ajax for getting history here Here */
	var historyHeaderElem = widgetGenerator.createHeader("TRANSACTION HISTORY");
	
	var tableWidget;
	console.log(statHist);
	
	try{
		if(statHist.length == 0 ){
			tableWidget = widgetGenerator.createTableWidget(["NO TRANSACTION HISTORY"], "txnHistTable");
		} else {
			tableWidget = widgetGenerator.createTableWidget(["Status", "Date"], "txnHistTable");
			for(i in statHist.Stat){
				var arr = [];
				arr.push(statHist.Stat[i].statusvalue);
				arr.push(statHist.Stat[i].timestamp);
				tableWidget.addRow(arr);
			}
		}
	} catch(e) {
		try{
			if(typeof statHist.length != 'undefined'){
				tableWidget = widgetGenerator.createTableWidget(["Status", "Date"], "txnHistTable");
				var arr = [];
				arr.push(statHist.Stat.statusvalue);
				arr.push(statHist.Stat.timestamp);
				tableWidget.addRow(arr);
			} 
		} catch(e) {
			tableWidget = widgetGenerator.createTableWidget(["NO TRANSACTION HISTORY"], "txnHistTable");
		}	
			

	}
	
	$(body).append(historyHeaderElem);
	$(body).append(tableWidget.main);
}

function formatTimeForStatHist(stringDate){
	var d = new Date(stringDate);
	var str = $.datepicker.formatDate('mm/dd/yyyy', d);
	return str;
}

function generateErrorImg() {
	var errorImg = document.createElement('div');	
	$(errorImg).addClass('noTransactionData');
	return errorImg;
}

function generateErrorMsg() {
	var errorMsg = document.createElement('button');	
	$(errorMsg).text("No Transaction History");
	$(errorMsg).addClass('errorMsg');
	return errorMsg;
}

function formatDate(date) {
	var d = new Date(date),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [month, day, year].join('/');
}

function formatDateForHistory(date) {
	var strArrayDate = date.split(" ");
	var d = new Date(strArrayDate[5] + "-" + strArrayDate[1] + "-" + strArrayDate[2]);
	console.log(d);
	month = '' + (d.getMonth() + 1);
	day = '' + d.getDate();
	year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [month, day, year].join('/');
}


function buildFields(fieldList, wrapper){
	if(fieldList != null){
		for(var id in fieldList){
			var _type = fieldList[id];
			var _element;
			var _id = id.replace(/ +/g, "").toLowerCase();

			if(_type == 0){
				_element = buildDefaultTxt(id);
			}else if(_type == 1){
				_element = buildRequiredFld(id);
				$(_element).find('div').hide();
				$(_element).find('input').removeClass('has-error');
			}else if(_type == 2){
				_element = buildDateField('Birthdate',_id,'01011900','current','current','mm/dd/yy', true);
				$(_element).find('input').addClass('is-disabled').attr('disabled',true);
				$(_element).find('input').datepicker('disable');
			}else{
				_element = buildDisabledFld(id);
			}
			if(_type != 2){
				$(_element).attr('id', _id);
			}			
			$(wrapper).append(_element);
		}
	}
}

function buildFldWithIcon(placeholder,icon){
	var _txtPnl = document.createElement('div');
	var _txtFld = document.createElement('input');
	var _icon = document.createElement('img');

	$(_txtFld).attr('placeholder', placeholder);
	$(_txtFld).attr('id', 'login'+ placeholder);
	$(_txtFld).addClass('login-field');
// $(_txtFld).css("background-image",'url(' + icon + ')');
	$(_icon).attr('src', icon);
	$(_icon).addClass('login-icon');

	$(_txtPnl).addClass('login-field-wrapper');
	$(_txtPnl).append(_icon);
	$(_txtPnl).append(_txtFld);
	

	return _txtPnl;
}


function buildLoginFields(wrapper){
	var _fieldList = {'Username':USERNAME_ICON, 'Password':PASSWORD_ICON};

	for(let _field in _fieldList){
		var _element;

		_element = buildFldWithIcon(_field,_fieldList[_field]);

// if(_field == 'Username'){
// $(_element).find('input').val('budoyong');
// }
		
		if(_field == 'Password'){
// $(_element).find('input').val('11111111');
			$(_element).find('input').attr('type','password');
		}

		$(wrapper).append(_element);
	}
}

function buildRoundButton(text){
	var _rndBtn = document.createElement('button');
	$(_rndBtn).addClass('rnd-btn');
	$(_rndBtn).addClass('defaultButton');
	$(_rndBtn).text(text);

	return _rndBtn;
}

function buildBanner(image){
	var _bnnr = document.createElement('div');
	var _bckBtn = document.createElement('button');
	var width = $(window).width();

	$(_bckBtn).addClass('banner-back-button');	

	$(_bnnr).css('background-image', 'url(' + image + ')');
	$(_bnnr).addClass('banner-box');
	if(width < 600){;
		$(_bnnr).addClass('narrow-banner');
	}else{
		$(_bnnr).addClass('wide-banner');			
	}
	$(_bnnr).append(_bckBtn);

	$(window).on('resize', function(){
		var width = $(window).width();
		if(width < 600){
			$(_bnnr).removeClass('wide-banner');
			$(_bnnr).addClass('narrow-banner');
		}else{
			$(_bnnr).removeClass('narrow-banner');
			$(_bnnr).addClass('wide-banner');			
		}
	});

	return _bnnr;
}

function buildUpload(label,placeholder,container,id){
	var _uplPnl = document.createElement('div');
	var _uplLbl = document.createElement('label');
	var _uplFld = document.createElement('div');
	var _uplTxt = document.createElement('div');
	var _uplBtn = document.createElement('button');
	var _delBtn = document.createElement('button');

	$(_uplPnl).addClass('txt-group-pnl');
	$(_uplFld).addClass('upld-holder');
	$(_uplTxt).addClass('upld-txt');
	$(_uplBtn).addClass('btn dflt-btn upld-btn');
	$(_delBtn).addClass('btn danger-btn upld-btn');

	$(_uplLbl).text(label);

	$(_uplBtn).html('Select File');
	$(_delBtn).html('Delete File');

	$(_uplFld).append(_uplTxt);
	$(_uplFld).append(_uplBtn);
	$(_uplFld).append(_delBtn);

	$(_uplPnl).append(_uplLbl);
	$(_uplPnl).append(_uplFld);

	$(_uplBtn).on('click', function(){
		var _uplInpt = document.createElement('input');

		$(_uplInpt).attr({
			'type':'file', 
			'multiple':false, 
			'display':'none'
		});

		$(_uplInpt).on('change', function(){
			for(let file of this.files){
				container[id] = file;
			}
			updateFiles();
		});

		$(_uplInpt).click();
	});

	$(_delBtn).on('click', function(){
		container[id] = null;
		updateFiles();
	});

	function updateFiles(){
		var wrapper = $(_uplFld);
		var files = container;

		if(files[id]){	
			$(_uplTxt).html(files[id].name);
			$(_delBtn).show();
			$(_uplBtn).hide();
		}else{
			$(_uplTxt).html(placeholder);
			$(_uplBtn).show();
			$(_delBtn).hide();
		}	

	}

	updateFiles();

	return _uplPnl;
}

/**
 * Creates a tab selection:
 * 
 * @param buttons -
 *            an array parameter containing the labels of each tab button
 * @param prefix -
 *            string for naming tab buttons and panes/containers e.g. prefix =
 *            'my' resulting buttons will be id'ed 'myTabBtn' while
 *            panes/containers are 'myTabPn' with an incrementing label starting
 *            from 0
 * 
 * Note: This widget uses 100% width so container/wrapper should handle margins.
 * Note2: Uses animate.css Note3: Selected tab highlight and tab labels are
 * fixed 200px width.
 */
function buildTabs(buttons,prefix){
	var _wrp = document.createElement('div');
	var _tbBx = document.createElement('div');
	var _hglt = document.createElement('div');
	var _cnt = 0;
	var _wait;
	$(_tbBx).addClass('wdgt-tab-container');
	$(_hglt).addClass('wdgt-tab-highlight');
	$(_wrp).append(_tbBx);
	for(let _btn of buttons){
		var _tb = document.createElement('div');
		var _pn = document.createElement('div');
		$(_tb).attr('id', prefix + 'TabBtn' + _cnt);
		$(_pn).attr('id', prefix + 'TabPn' + _cnt);
		$(_tb).data('index', _cnt);
		$(_tb).addClass('wdgt-tab-btn');
		$(_tb).html(_btn);
		$(_tbBx).append(_tb);
		if(_cnt>0){
			$(_pn).hide();
		}
		$(_wrp).append(_pn);
		_cnt++;
	}
	$(_tbBx).append(_hglt);
	var _init = $(_tbBx).find('.wdgt-tab-btn').first().offset().left;
	$(_hglt).offset({left: _init});
	$(_tbBx).find('.wdgt-tab-btn').each(function(){ 			
		$(this).on('click', function(){
			var _idx = $(this).data('index');
			var _x   = $(this).offset().left;
			$(_hglt).offset({left: _x});
			$('#'+ prefix + 'TabPn' + _idx).siblings(':not(.wdgt-tab-container)').hide();
			$('#'+ prefix + 'TabPn' + _idx).show();
			$(this).siblings().removeAttr('tabClicked');
			$(this).siblings().css('color','grey');
			$(this).attr('tabClicked', true);
			$(this).css('color','black');
			

		});
	});

	$(window).on('resize', function(){
		clearTimeout(_wait);
		_wait = setTimeout(readjust, 100);
	});
	
	function readjust(){
		if($(_tbBx).is(":visible")){
			$(_tbBx).find('[tabClicked=true]').trigger('click');
		}		
	}
	return _wrp;
}

function buildDateFieldReg(label){
	var calendarIconUrl = 'assets/img/calendar-icon.png';
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');

	$(_txtPnl).addClass('txt-group-pnl');
	// $(_txtFld).addClass('date-txtbx');
	$(_txtFld).attr('readonly',true);

	$(_txtLbl).text(label);

	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);

	$(_txtFld).datepicker({
		showOn: "button",
		buttonImage: calendarIconUrl,
		buttonImageOnly: true,
		dateFormat: 'mm/dd/yy',
		showButtonPanel: true,
		changeMonth: true,
		changeYear: true,
	});
	return _txtPnl;
}

/**
 * Creates a date picker widget:
 * 
 * @param label -
 *            companion label text
 * @param id -
 *            input element id attribute
 * @param min -
 *            minimum date, blank defaults to Jan 01, 1900
 * @param max -
 *            maximum date, blank defaults to current date
 * @param val -
 *            initial value on input component values for min max and val should
 *            be string format and 8 characters length e.g. 01011990 (mmddyyyy)
 * @param format -
 *            format of selected displayed on input component. example values :
 *            'M dd, yy' complete list of values:
 *            https://api.jqueryui.com/datepicker/#utility-formatDate Note: This
 *            function uses svistyle.css
 */ 
function buildDateField(label,id,min,max,val,format,isDisabled) {
	var calendarIconUrl = "assets/resources/images/calendar-icon.png";
	var _txtPnl = document.createElement("div");
	var _txtLbl = document.createElement("label");
	var _txtFld = document.createElement("input");
	var _def = "01011900";
	var _min;
	var _max;
	var now = getNow();
	var tomorrow = getTomorrow();
	$(_txtPnl).addClass("txt-group-pnl");
	$(_txtFld).attr("readonly", true);
	$(_txtFld).attr("id", id);
	$(_txtLbl).text(label);
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);
	if (min == "current") {
		_min = now;
	} else if (min == "") {
		_min = convert(_def);
	} else if (min == "tomorrow"){
		_min = tomorrow;
	} else {
		_min = convert(min);
	}
	if (max == "current" || max == "") {
		_max = now;
	} else {
		_max = convert(max);
	}
	$(_txtFld).datepicker({
		showOn: "button",
		buttonImage: calendarIconUrl,
		buttonImageOnly: true,
		dateFormat: format,
		showButtonPanel: true,
		changeMonth: true,
		changeYear: true,
		yearRange: "1900:2100",
		minDate: $.datepicker.parseDate("M dd, yy", _min),
		maxDate: $.datepicker.parseDate("M dd, yy", _max)
	});
	if(isDisabled){
		$(_txtFld).datepicker( "isDisabled" );
	}
	if (val == "current" || val == "") {
		$(_txtFld).datepicker("setDate", now);
	} else if (val == "tomorrow") {
		$(_txtFld).datepicker("setDate", tomorrow);
	} else {
		var nval = convert(val);
		$(_txtFld).datepicker("setDate", $.datepicker.parseDate("M dd, yy", nval));
	}
	function getNow() {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; // January is 0!
		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}
		mm = convertMonth(mm);
		today = mm + " " + dd + ", " + yyyy;
		return today;
	}
	
	function getTomorrow() {
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		var dd = tomorrow.getDate();
		var mm = tomorrow.getMonth() + 1; //January is 0!
		var yyyy = tomorrow.getFullYear();
		if (dd < 10) {
			dd = "0" + dd;
		}
		mm = convertMonth(mm);
		tomorrow = mm + " " + dd + ", " + yyyy;
		return tomorrow;
	}
	
	function convert(text) {
		var dd = text.substring(2, 4);
		var mm = text.substring(0, 2);
		var yyyy = text.substring(4, 8);
		var val = convertMonth(mm) + " " + dd + ", " + yyyy;
		return val;
	}
	function convertMonth(num) {
		var nm = Number(num);
		var mm;
		switch (nm) {
		case 1:
			mm = "Jan";
			break;
		case 2:
			mm = "Feb";
			break;
		case 3:
			mm = "Mar";
			break;
		case 4:
			mm = "Apr";
			break;
		case 5:
			mm = "May";
			break;
		case 6:
			mm = "Jun";
			break;
		case 7:
			mm = "Jul";
			break;
		case 8:
			mm = "Aug";
			break;
		case 9:
			mm = "Sep";
			break;
		case 10:
			mm = "Oct";
			break;
		case 11:
			mm = "Nov";
			break;
		default:
			mm = "Dec";
		break;
		}
		return mm;
	}
	return _txtPnl;
}

function buildNumInput(label,placeholder){
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');

	$(_txtPnl).addClass('txt-group-pnl');

	$(_txtLbl).text(label);
	$(_txtFld).attr('placeholder',placeholder);
	$(_txtFld).attr('type', 'number');

	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);
	return _txtPnl;
}

function makeAlertNotice(wt,msg) {
	var wdgt = $(wt).closest('.txt-group-pnl'); 
	var _rqrdNote = document.createElement("div");
	$(_rqrdNote).addClass("is-required");
	$(_rqrdNote).text(msg);
	$(wdgt)
	.find("input")
	.addClass("has-error");
	$(wdgt).append(_rqrdNote);
}

function alertRequired(wt){
	var wdgt = $(wt).parent();
	var _rqrdNote = document.createElement("div");
	$(_rqrdNote).addClass("is-required");
	$(_rqrdNote).text("This is required");
	$(wdgt)
	.find("input")
	.addClass("has-error");
	$(wdgt).append(_rqrdNote);
}

function removeAlertNotice(wt){
	var wdgt = $(wt).closest('.txt-group-pnl'); 
	$(wdgt).find('.is-required').remove();
	$(wdgt)
	.find("input")
	.removeClass("has-error");
}

function removeRequiredAlert(wt){
	var wdgt = $(wt).parent(); 
	$(wdgt).find('.is-required').remove();
	$(wdgt)
	.find("input")
	.removeClass("has-error");
}

function makeMultiWdgt(wdgt, cloneClass, collection) {
	var _cloneBtn = document.createElement("div");
	var _wdth = $(wdgt).width();
	var _hgth = $(wdgt).height();
	var _tag = cloneClass + "-clone";
	var _npts = $(wdgt).find("input");
	var _slcts = $(wdgt).find("select");
	var _ctr = 0;
	var _og = $(wdgt).clone(true);
	$(_npts).each(function() {
		$(this).addClass("multiple-type-wdgt");
	});
	$(_slcts).each(function() {
		$(this).addClass("multiple-type-wdgt");
	});
	$(wdgt).addClass(_tag);	
	$(_cloneBtn).addClass("add-clone-btn");
// $(_cloneBtn).css("left", "calc(" + _wdth + "px - 25px)");
// $(_cloneBtn).css("top", "calc(-" + _hgth + "px)");
	$(_cloneBtn).on("click", function() {
		var _cln;
		var _delBtn = document.createElement("div");
		var _wdth = $(wdgt).width();
		var _hgth = $(wdgt).height();	
		var options = {};					
		$(wdgt).find('.hasDatepicker').each(function(){		
			options['showOn'] = $(this).datepicker("option", "showOn");
			options['buttonImage'] = $(this).datepicker("option", "buttonImage");
			options['buttonImageOnly'] = $(this).datepicker("option", "buttonImageOnly");
			options['dateFormat'] = $(this).datepicker("option", "dateFormat");
			options['showButtonPanel'] = $(this).datepicker("option", "showButtonPanel");
			options['changeMonth'] = $(this).datepicker("option", "changeMonth");
			options['changeYear'] = $(this).datepicker("option", "changeYear");
			options['yearRange'] = $(this).datepicker("option", "yearRange");
			options['minDate'] = $(this).datepicker("option", "minDate");
			options['maxDate'] = $(this).datepicker("option", "maxDate");
			$(this).addClass('hadDatepicker');	
			$(this).datepicker("destroy");
		});
		_cln = $(wdgt).clone(true);	
		$(_delBtn).addClass("remove-clone-btn");
// $(_delBtn).css("left", "calc(" + _wdth + "px - 25px");
// $(_delBtn).css("top", "calc(-" + _hgth + "px + 25px)");
		$(_delBtn).on("click", function() {
			if(collection){
				var npts = $(_cln).find("input");
				var slcts = $(_cln).find("select");
				var length = collection.length;
				$(npts).each(function() {					
					var index = collection.indexOf(this);
					collection.splice(index, 1);

				});
				$(slcts).each(function() {		
					var index = collection.indexOf(this);
					collection.splice(index, 1);
				});
			}
			$(_cln).remove();
		});
// $(_cln).prepend(_delBtn);
		$(_cln)
		.find(".add-clone-btn")
		.remove();
		$(_cln).find('.segment-title').append(_delBtn);
		$(_cln).insertAfter($("." + _tag).last());
		// copy original value and visibility
		var npts = $(_cln).find("input");
		var slcts = $(_cln).find("select");
		var ognpts = $(_og).find("input");
		var ogslcts = $(_og).find("select");
		for(let i = 0; i < npts.length; i++){		
			if(npts.eq(i).hasClass('has-error')){
				removeAlertNotice(npts.eq(i));
			}
			if(npts.eq(i).prop('type')=='checkbox'){
				npts.eq(i).prop('checked', ognpts.eq(i).prop('checked'));
				if(ognpts.eq(i).closest('label').css('display') == 'none'){
					npts.eq(i).closest('label').hide();
				}
			}else{
				npts.eq(i).val(ognpts.eq(i).val());
				if(ognpts.eq(i).closest('div').css('display') == 'none'){
					npts.eq(i).closest('div').hide();
				}
			}
		}
		for(let i = 0; i < slcts.length; i++){			
			slcts.eq(i).val(ogslcts.eq(i).val());
			if(ogslcts.eq(i).closest('div').css('display') == 'none'){
				slcts.eq(i).closest('div').hide();
			}
		}
		if(collection){			
			var index = collection.length;
			$(npts).each(function() {
				if($(this).hasClass('hadDatepicker')){
					var id = $(this).attr('id');					
					id = id + index;
					$(this).attr('id',id);
					reApplyDatePicker(this, options);
					$(wdgt).find('.hadDatepicker').each(function(){			
						reApplyDatePicker(this, options);
					});
				}
				collection.push(this);
				index++;
				$(this).trigger('change');
			});
			$(slcts).each(function() {
				collection.push(this);
				index++;
				$(this).trigger('change');
			});
		}	
	});
// $(window).on("resize", function() {
// var _wdth = $(wdgt).width();
// var _hgth = $(wdgt).height();
// $(_cloneBtn).css("left", "calc(" + _wdth + "px - 25px");
// $(".remove-clone-btn").css("left", "calc(" + _wdth + "px - 25px");
// $(_cloneBtn).css("top", "calc(-" + _hgth + "px)");
// $(".remove-clone-btn").css("top", "calc(-" + _hgth + "px + 25px)");
// });
	$(wdgt).find('.segment-title').append(_cloneBtn);

	function reApplyDatePicker(wdgt, options){		
		$(wdgt).datepicker(options);
	}
}
function buildUneditableFld(label, text) {
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');

	$(_txtPnl).addClass('txt-group-pnl');

	$(_txtFld).prop('disabled', true);
	$(_txtFld).val(text);

	$(_txtLbl).text(label);

	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);
	return _txtPnl;
}
function buildRequiredFldv2(label,min,max) {
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');
	var _rqrdNote = document.createElement('div');

	$(_txtPnl).addClass('txt-group-pnl');
	$(_txtFld).addClass('has-error');
	$(_rqrdNote).addClass('is-required');

	$(_txtFld).data('min' , min);
	$(_txtFld).data('max' , max);

	$(_txtFld).on('keypress',function(e) { 
		var $that = $(this);
		maxlength = $(this).data('max')
		if($.isNumeric(maxlength)){
			if($that.val().length == maxlength) {
				e.preventDefault();
				return; 
			}

			$that.val($that.val().substr(0, maxlength));
		};
	});

	$(_txtLbl).text(label);
	$(_rqrdNote).text('This field is required.');

	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);
	$(_txtPnl).append(_rqrdNote);
	return _txtPnl;
}

function buildRequiredFldWithSelect(label,selectElement) {
	var _txtPnl = document.createElement('div');
	var _slctInputHolder= document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');
	var _rqrdNote = document.createElement('div');

	
	$(_txtPnl).addClass('txt-group-pnl');
	$(_txtFld).addClass('has-error');
	$(_rqrdNote).addClass('is-required');

	$(_txtLbl).append(label);
	$(_txtLbl).append('<span style="color: rgb(255, 0, 0);"> *</span>');
	$(_rqrdNote).text('This field is required.');

	$(_slctInputHolder).addClass('asdasd');
	$(_slctInputHolder).append(selectElement);
	$(_slctInputHolder).append(_txtFld);
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_slctInputHolder);
	$(_slctInputHolder).append(_rqrdNote);
	return _txtPnl;
}

function buildUploadField(label) {
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	
	var _uploadBox = document.createElement('input');
	$(_uploadBox).addClass('upload-file-box');
	$(_uploadBox).prop("disabled", true);
	var _uploadBtn = document.createElement('button');
	$(_uploadBtn).addClass('upload-file-btn');
	$(_uploadBtn).html("Browse");
	
	$(_txtLbl).text(label);
	
	$(_txtPnl).addClass('upload-file-div');
	// $(_txtPnl).addClass('txt-group-pnl');
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_uploadBox);
	$(_txtPnl).append(_uploadBtn);

	// addUploadFileFunction(_uploadBox,_uploadBtn);
	
	return _txtPnl;
}


function buildUploadFieldV2(label,isRequired) {
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	
	var _uploadBox = document.createElement('div');
	$(_uploadBox).addClass('upload-file-box-company');
	$(_uploadBox).prop("disabled", true);
	var _uploadBtn = document.createElement('button');
	$(_uploadBtn).addClass('upload-file-btn-company');
	$(_uploadBtn).html("Add Files");
	
	
	
	$(_txtPnl).addClass('upload-file-div');
	// $(_txtPnl).addClass('txt-group-pnl');
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_uploadBox);
	$(_txtPnl).append(_uploadBtn);

	if(isRequired == true){
		var _rqrdNote = document.createElement('div');
		$(_rqrdNote).addClass('is-required');
		$(_rqrdNote).text('This field is required.');
		$(_txtPnl).append(_rqrdNote);
		var label2 = document.createElement('label');
		$(label2).append("*");
		$(label2).css('color', ' red');
		$(label2).css('display', ' contents');
		$(_txtLbl).append(label);
		$(_txtLbl).append(label2);
	} else {
		$(_txtLbl).append(label);
	}
	
	// addUploadFileFunction(_uploadBox,_uploadBtn);
	
	return _txtPnl;
}



function addUploadFileFunctionV2(elementBox, elementBtn, _files){
	var elem = $(elementBtn);
	elem.on('click', function(){
		var _uplInpt = document.createElement('input');

		$(_uplInpt).attr({
			'type':'file', 
			'multiple':false, 
			'display':'none'
		});

		$(_uplInpt).on('change', function(){				
			for(let file of this.files){
				_files.push(file);
			}
			
			$(elementBox).empty();
			
			for(let file of this.files){
				$(elementBox).append(file.name);
			}
			
// $(elementBox).val(global.formUploadFile.name);
			
		});

		$(_uplInpt).click();
	});
}

function addUploadFileFunction(elementBox, elementBtn){
	var elem = $(elementBtn);
	elem.on('click', function(){
		var _uplInpt = document.createElement('input');

		$(_uplInpt).attr({
			'type':'file', 
			'multiple':false, 
			'display':'none'
		});

		$(_uplInpt).on('change', function(){				
			for(let file of this.files){
				global.formUploadFile = file;
			}
			$(elementBox).val(global.formUploadFile.name);
			
		});

		$(_uplInpt).click();
	});
}

function buildSliderWdgt(label,min,max,step,enabled){
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _sldr = document.createElement('div');
	var _disabled = !enabled;

	$(_txtPnl).addClass('txt-group-pnl');

	$(_txtLbl).text(label);
	$(_sldr).slider({
		range : true,
		min : min,
		max : max,
		step : step,
		disabled, _disabled
	});

	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_sldr);
	return _txtPnl;
}

function createPageButtons(numbers, wrap){
	var firstBtn = document.createElement('div');
	var backBtn = document.createElement('div');
	var nextBtn = document.createElement('div');
	var lastBtn = document.createElement('div');
	
	$(firstBtn).addClass('first-page-btn');
	$(backBtn).addClass('back-page-btn');
	$(nextBtn).addClass('next-page-btn');
	$(lastBtn).addClass('last-page-btn');
	
	$(wrap).append(firstBtn);
	$(wrap).append(backBtn);
	
	for(let i = 1; i<numbers.length+1; i++){
		var pgBtn = document.createElement('div');
		$(pgBtn).addClass('num-page-btn').html(i);
		$(wrap).append(pgBtn);
	}
	
	$(wrap).append(nextBtn);
	$(wrap).append(lastBtn);		
}

function ajaxTrxnFiles(id,txId,callback){
	var data = id + txId;
	var url = TRANSACTION_FILES_SERVICE + data +'/files';
    var response;
    $.ajax({
        url: url,
		method: 'GET',
        success: function (result) {
        	response = result;
            callback(response);
        },
        error: function () {
// remove;
        }
    });
	
	/*
	 * var url = TRANSACTION_FILES_SERVICE + 'value=' +id +txId +'/files'; var
	 * filesArr = [];
	 * 
	 * $.ajax({ url: url, method: 'GET', success: function(result) { if(result){
	 * console.log("Txn: " + result) $.each(result, function( i, v ) { alert(v)
	 * filesArr.push(v); });
	 * 
	 * }else{ console.log("Txn!") } } });
	 * 
	 * 
	 * console.log("-=-=-=-=-=- " +filesArr);
	 */
}

function ajaxTransAppForm(id, txId, callback, callbackVal){
	var data = id + txId;
	var url = TRANSACTION_APPFORM + txId + '&pid=' + id;
//	url = "http://localhost:8080/transaction-webservice/rest/transaction/XML?txnid=SG05JIT3GK003XBH&pid=74070a1e-7270-4349-a4bc-a0a111a2a055";
	var response;
    $.ajax({
        url: url,
		method: 'GET',
        success: function (result) {
        	response = result;
        	callbackVal(response);
        	var serviceName = response.svc_name;
        	var servicesData = services;
        	servicesData.forEach(function(file) {
        		if(serviceName == file.name){
        			ajaxTransGenForm(serviceName, file.code, function(returnVal){
        				callback(returnVal);
        			});
        		}
			});	
        },
        error: function () {
// remove;
        }
    });
}

function ajaxTransGenForm(serName, serCode, callback, remove){
	$.ajax({
		url:SERVICES_FORM_CONFIG_URL,
		data: {code: serCode, name:serName},
		success: function(response){
			callback(response);
		},
		error: function(xhr,text,error){
		}
	});	
}

function getServicesData(data){
	services = data;
}

var widgetGenerator = {
		createHeader : function(headerName){
			var header = document.createElement("div");
			$(header).addClass('txTabHeader');
			$(header).html(headerName);
			
			return header;
		},
		createTableWidget : function(headers, className){
			var table = document.createElement("div");
			$(table).addClass(className);
			var length = headers.length;
			var cellsize = 100/length;
			
			for(i in headers){
				var headerCell = document.createElement("div");
				$(headerCell).addClass("sheaders");
				$(headerCell).css("width", cellsize + "%");
				$(headerCell).text(headers[i]);
				$(table).append(headerCell);
			}
			
			return {
				main: table,
				addRow: function(data){
					for(j = 0; j < length; j++) {
						var cell = document.createElement("div");
						$(cell).css("width", cellsize + "%");
						if(data[j]){
							$(cell).text(data[j]);
							
						}
						$(table).append(cell);
					}
				}
			}
		}
		
		
};

