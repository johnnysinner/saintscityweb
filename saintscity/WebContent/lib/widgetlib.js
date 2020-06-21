/**
* Creates container for each section:
* 
* @param title - text shown above the section
* @param widthType - Defines the length of the section container. The following types are:
* 1 = 90%
* 2 = 45%
*/

function buildSegment(title,widthType){
	var _segmentPnl = document.createElement('div');
	var _titlePnl = document.createElement('div');
	
	$(_segmentPnl).addClass('segment-pnl');
	$(_titlePnl).addClass('segment-title');
	$(_titlePnl).text(title);
	
	if(widthType == 2){
		$(_segmentPnl).addClass('segment-pnl-short');
	}
	
	$(_segmentPnl).append(_titlePnl);
	return _segmentPnl;
}

function buildDateFieldz(label){
	var calendarIconUrl = 'assets/resources/images/calendar-icon.png';
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');
	
	$(_txtPnl).addClass('txt-group-pnl');
	//$(_txtFld).addClass('date-txtbx');
	$(_txtFld).attr('readonly',true);
	
	$(_txtLbl).text(label);
	
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);
	
	$(_txtFld).datepicker({
		showOn: "button",
		buttonImage: calendarIconUrl,
		buttonImageOnly: true,
		dateFormat: 'M dd, yy',
		showButtonPanel: true,
		changeMonth: true,
		changeYear: true,
	});
	return _txtPnl;
}

function buildCurrencyField(currency,label){
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');
	var _currencyFld = document.createElement('label');
	
	$(_txtPnl).addClass('txt-group-pnl');
	$(_currencyFld).addClass('is-currency');
	$(_txtFld).addClass('is-currency-fld');
	
	$(_txtLbl).text(label);
	$(_currencyFld).text(currency);
	
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);
	$(_txtPnl).append(_currencyFld);
	
	return _txtPnl;
}

function buildDefaultTxt(label,placeholder,value){
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');
	
	$(_txtPnl).addClass('txt-group-pnl');
	
	$(_txtLbl).text(label);
	$(_txtFld).attr('placeholder',placeholder);
	
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);
	return _txtPnl;
}

function buildDisabledFld(label,placeholder,value){
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');
	
	$(_txtPnl).addClass('txt-group-pnl');
	$(_txtFld).addClass('is-disabled');
	
	$(_txtLbl).text(label);
	$(_txtFld).val(value);
	
	$(_txtFld).attr('placeholder',placeholder);
	$(_txtFld).attr('disabled','disabled');
	
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);
	return _txtPnl;
}

function buildRequiredFld(label) {
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _txtFld = document.createElement('input');
	var _rqrdNote = document.createElement('div');
	
	$(_txtPnl).addClass('txt-group-pnl');
	$(_txtFld).addClass('has-error');
	$(_rqrdNote).addClass('is-required');
	
	$(_txtLbl).text(label);
	$(_rqrdNote).text('This field is required.');
	
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_txtFld);
	$(_txtPnl).append(_rqrdNote);
	return _txtPnl;
}

function buildDropdown(label,list){
	var _txtPnl = document.createElement('div');
	var _txtLbl = document.createElement('label');
	var _dropdown = document.createElement('select');
	
	for(var i in list){
		var _opt = document.createElement('option');
		$(_opt).text(list[i]);
		$(_opt).val(list[i]);
		$(_dropdown).append(_opt);
	}
	
	$(_txtPnl).addClass('txt-group-pnl');
	
	$(_txtLbl).text(label);
	
	$(_txtPnl).append(_txtLbl);
	$(_txtPnl).append(_dropdown);
	return _txtPnl;
}

function buildSrchBox(){
	var _srchTxtPnl = document.createElement('div');
	var _srchInpt = document.createElement('input');
	var _srchBtn = document.createElement('button');
	
	$(_srchInpt).attr('placeholder','Search');
	$(_srchBtn).text('');
	
	$(_srchTxtPnl).addClass('srch-group-pnl');
	
	$(_srchTxtPnl).append(_srchInpt);
	$(_srchTxtPnl).append(_srchBtn);
	return _srchTxtPnl;
}

function buildCheckbox(label,isChecked,isDisabled){
	var _chkbxPnl = document.createElement('label');
	var _chkBx = document.createElement('input');
	var _chkMrk = document.createElement('span');
	var _chkbxLbl = document.createElement('span');
	
	$(_chkBx).attr('type','checkbox');
	
	$(_chkbxPnl).addClass('checkbox');
	$(_chkMrk).addClass('checkmark');
	$(_chkbxLbl).addClass('checklabel');
	
	$(_chkbxLbl).text(label);
	
	$(_chkbxPnl).append(_chkBx);
	$(_chkbxPnl).append(_chkMrk);
	$(_chkbxPnl).append(_chkbxLbl);
	
	$(_chkBx).prop('checked',isChecked);
	$(_chkBx).attr("disabled", isDisabled);
	return _chkbxPnl;
}

function buildRadioBtn(label,name,isChecked,isDisabled){
	var _radioPnl = document.createElement('label');
	var _radio = document.createElement('input');
	var _radioMrk = document.createElement('span');
	var _radioLbl = document.createElement('span');
	
	$(_radio).attr('type','radio');
	$(_radio).attr('name',name);
	
	$(_radioPnl).addClass('radio-grp-pnl');
	$(_radioMrk).addClass('radiomark');
	$(_radioLbl).addClass('radiolabel');
	
	$(_radioLbl).text(label);
	
	$(_radioPnl).append(_radio);
	$(_radioPnl).append(_radioMrk);
	$(_radioPnl).append(_radioLbl);
	
	$(_radio).prop('checked',isChecked);
	$(_radio).attr("disabled", isDisabled);
	return _radioPnl;
}

/**
* Creates different types of navigation menu:
* 
* @param menuList - List of menus written in a JSON format, key = Button Id, value = Button Label
* @param menuType - Defines how the menus are gonna be displayed. The following types are:
* 1 = Horizontal Icons Only Menu
* 2 = Horizontal Icons + Label Menu
* 3 = Vertical Icons Only Menu
* 4 = Vertical Icons + Label Menu
* Icons are set thru css.
*/

function buildNavigation(menuList, menuType){
	var _navGrpPnl = document.createElement('div');
	
	if(menuType == 1 || menuType == 2){
		$(_navGrpPnl).addClass('nav-grp-pnl-horizontal');
	}else if(menuType == 3){
		$(_navGrpPnl).addClass('nav-grp-pnl-vertical');
	}else if(menuType == 4){
		$(_navGrpPnl).addClass('nav-grp-pnl-vertical-type4');
	}
	
	
	if(menuList != null){
		for(var id in menuList){
			var menuTxt = menuList[id];
			var _menuPnl = document.createElement('button');
			var _menuIcon = document.createElement('span');
			var _menuLbl = document.createElement('span');
			
			$(_menuPnl).attr('id',id);
			$(_menuPnl).attr('title',menuTxt);
			$(_menuLbl).text(menuTxt);
		
			$(_menuPnl).append(_menuIcon);
			$(_menuPnl).append(_menuLbl);
			
			$(_menuPnl).addClass('menu-btn-pnl');
			$(_menuIcon).addClass('menu-icon');
			$(_menuLbl).addClass('menu-label');
				
			if(menuType == 1){
//				$(_menuPnl).addClass('type1-pnl');
//				$(_menuIcon).addClass('type1-icon');
//				$(_menuLbl).addClass('type1-label');
			}else if(menuType == 3){
//				$(_menuPnl).addClass('type3-pnl');
//				$(_menuIcon).addClass('type3-icon');
//				$(_menuLbl).addClass('type3-label');
			}else if(menuType == 4){
//				$(_menuPnl).addClass('type4-pnl');
//				$(_menuIcon).addClass('type4-icon');
//				$(_menuLbl).addClass('type4-label');
			}
			
			$(_navGrpPnl).append(_menuPnl);
		}
	}
	
	return _navGrpPnl;
}


function buildNavigationWithGroups(menuList){
	var _navGrpPnl = document.createElement('div');
	$(_navGrpPnl).addClass('nav-grp-pnl-vertical-type4');
	
	for(groupnum in menuList){
		var groupings = menuList[groupnum];
		var menus = groupings.menus;
		if(groupings.type === "list"){
			var menuListElem = [];
			var wrapper = document.createElement('button');
			$(wrapper).addClass("profile-grouping-wrapper");
			
			var groupTypeList = document.createElement('span');
			$(groupTypeList).text(groupings.label);
			$(groupTypeList).addClass("profile-grouping");
			$(groupTypeList).addClass("profile-grouping-show");
			
			var imgPanel = document.createElement('span');
			$(imgPanel).attr("id", groupings.imgId);
			$(imgPanel).addClass("profile-grouping-img");
			
			
			$(wrapper).append(imgPanel);
			$(wrapper).append(groupTypeList);
			$(_navGrpPnl).append(wrapper);
			
			for(var id in menus){
				var menuTxt = menus[id];
				var menu = buildMenu(menuTxt, "menu-panel-listed");
				menuListElem.push(menu);
				$(_navGrpPnl).append(menu);
			}
			
			addGroupHandler(wrapper, groupTypeList, menuListElem);
		}else{
			var separator = document.createElement('div');
			$(separator).addClass("profile-grouping-separator");
			//$(_navGrpPnl).append(separator);
			for(var id in menus){
				var menuTxt = menus[id];
				var menu = buildMenu(menuTxt, "");
				$(_navGrpPnl).append(menu);
			}
		}
	}
	
	function buildMenu(menuTxt, classTxt){
				var _menuPnl = document.createElement('button');
				var _menuIcon = document.createElement('span');
				var _menuLbl = document.createElement('span');
				
				$(_menuPnl).attr('id',id);
				$(_menuPnl).attr('title',menuTxt);
				$(_menuLbl).text(menuTxt);
			
				$(_menuPnl).append(_menuIcon);
				$(_menuPnl).append(_menuLbl);
				
				$(_menuPnl).addClass('menu-btn-pnl');
				$(_menuPnl).addClass(classTxt);
				$(_menuIcon).addClass('menu-icon');
				$(_menuLbl).addClass('menu-label');
					
				
				return _menuPnl;
	}
	
	function addGroupHandler(wrapper, div, elemList){
		var isHide = true;
		$(wrapper).on("click tap", function(){
			if($(div).hasClass( "profile-grouping-show" )){
				isHide = true;
			}else{
				isHide = false;
			}
			
			$('.menu-panel-listed').each(function(i, obj) {
				$(obj).hide();
			});
			
			$('.profile-grouping').each(function(i, obj) {
				//$(obj).hide();
				$(obj).removeClass("profile-grouping-show");
				$(obj).addClass("profile-grouping-hide");
			});
			
			for(elem in elemList){
				var menu = elemList[elem];
				if(isHide){
					$(menu).hide();
				}else{
					$(menu).show();
				}
			}
			
			if(isHide){
				isHide = false;
				$(div).removeClass("profile-grouping-show");
				$(div).addClass("profile-grouping-hide");
			}else{
				isHide = true;
				$(div).removeClass("profile-grouping-hide");
				$(div).addClass("profile-grouping-show");
			}
		});
	}
	
	
	return _navGrpPnl;
	
}


/*
* Creates List 
*/

function buildList(list){
	var _listPnl = document.createElement('div');
	$(_listPnl).addClass('listng-grp-pnl');
	
	if(list != null){
		for(var id in list){
			var titleTxt = list[id].title;
			var subtitleTxt = list[id].subtitle;
			
			var _list = document.createElement('div');
			var _listIcon = document.createElement('span');
			var _listTitle = document.createElement('span');
			var _listSubtitle = document.createElement('span');
			
			$(_list).attr('id',id);
			
			$(_list).addClass('list-container');
			$(_listIcon).addClass('list-icon');
			$(_listTitle).addClass('list-title');
			$(_listSubtitle).addClass('list-subtitle');
			
			$(_listTitle).text(titleTxt);
			$(_listSubtitle).text(subtitleTxt);
			$(_list).append(_listIcon);
			$(_list).append(_listTitle);
			$(_list).append(_listSubtitle);
			$(_listPnl).append(_list);
			
			$(_list).on('click',function(){
				$(this).toggleClass('active-list');
			});
		} 
	}
	return _listPnl;
}

function buildAccordion(accordionDtls){
	var _accdnPnl = document.createElement('div');
	$(_accdnPnl).addClass('accordion-grp-pnl');
	
	for(var id in accordionDtls){
		var txtTitle = accordionDtls[id];
		var _hdr = document.createElement('button');
		var _arrow = document.createElement('span');
		var _sectionPnl = document.createElement('div');
		
		$(_hdr).addClass('accordion-hdr');
		$(_sectionPnl).addClass('accordion-section-pnl');
		
		$(_hdr).text(txtTitle);
		$(_hdr).attr('id',id);
		
		$(_hdr).append(_arrow);
		$(_accdnPnl).append(_hdr);
		$(_accdnPnl).append(_sectionPnl);
		
		$(_hdr).on('click',function(){
			$(this).toggleClass('active-acc');
			if($(this).next('div').is(':visible')){
				$(this).next('div').fadeOut();
			}else{
				$(this).next('div').fadeIn();
			}
		});
	}
	
	return _accdnPnl;
}

function buildListWithAction (list,primaryBtnTxt){
	var _listPnl = document.createElement('div');
	$(_listPnl).addClass('listng-grp-pnl');
	
	if(list != null){
		for(var id in list){
			var titleTxt = list[id].title;
			var subtitleTxt = list[id].subtitle;
			
			var _list = document.createElement('div');
			var _listIcon = document.createElement('span');
			var _listTitle = document.createElement('span');
			var _listSubtitle = document.createElement('span');
			var _primaryBtn = document.createElement('button');
			var _primaryBtnIcon = document.createElement('span');
			
			$(_list).attr('id',id);
			
			$(_list).addClass('list-container2');
			$(_listIcon).addClass('list-icon2');
			$(_listTitle).addClass('list-title2');
			$(_listSubtitle).addClass('list-subtitle2');
			$(_primaryBtn).addClass('btn primary-btn list-primary-btn');
			
			$(_listTitle).text(titleTxt);
			$(_listSubtitle).text(subtitleTxt);
			$(_primaryBtn).text(primaryBtnTxt);
			
			$(_primaryBtn).append(_primaryBtnIcon);
			$(_list).append(_listIcon);
			$(_list).append(_listTitle);
			$(_list).append(_listSubtitle);
			$(_list).append(_primaryBtn);
			$(_listPnl).append(_list);
		
		} 
	}
	return _listPnl;
}