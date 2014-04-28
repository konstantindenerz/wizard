(function(scope){

/*

	$(function(){
		var context = {
			title: '',
			firstName: 'Konstantin',
			lastName: 'Denerz',
			otherField: '',
			lastField: ''
		};
		var pages = $('.page');
		var process = $('.navigation.process');
		var steps = $('.navigation.process .step');
		var navLeft = $('.navigation.left');
		var navRight = $('.navigation.right');

		function updateProcess(currentPage){
			var pageId = currentPage.attr('data-pageid');
			var newCurrentStep = process.find(['[data-pageref="',pageId,'"]'].join(''));
			var newCurrentStepIndex = steps.index(newCurrentStep);
			steps.removeClass('current done');
			steps.filter([':lt(',newCurrentStepIndex,')'].join('')).addClass('done');
			newCurrentStep.addClass('current');
		}

		function canNavigate(direction){
			var result = false;
			var currentPage = pages.filter('.current');
			var currentPageIndex = pages.index(currentPage);
			var newCurrentPageIndex = currentPageIndex + direction;
			if(newCurrentPageIndex >= 0 &&
				newCurrentPageIndex < pages.length){
				result = validateCurrentPage();
			}

			return result;
		}

		function checkNavigationState(){
			var currentPage = pages.filter('.current');
			var currentPageIndex = pages.index(currentPage);
			var newCurrentPageIndex = currentPageIndex - 1;
			if(newCurrentPageIndex >= 0 && !IsPersistPage()){
				navLeft.removeClass('disabled');
			}else{
				navLeft.addClass('disabled');
			}

			newCurrentPageIndex = currentPageIndex + 1;
			if(newCurrentPageIndex < pages.length){
				navRight.removeClass('disabled');
			}else{
				navRight.addClass('disabled');
			}
		}

		function navigate(direction){
			var currentPage = pages.filter('.current');
			var currentPageIndex = pages.index(currentPage);
			var newCurrentPageIndex = currentPageIndex + direction;
			if(newCurrentPageIndex >= 0 &&
				newCurrentPageIndex < pages.length){
				currentPage.removeClass('current');
				var newCurrentPage = pages.eq(newCurrentPageIndex);
				newCurrentPage.addClass('current');
				updateProcess(newCurrentPage);
				checkNavigationState();

			}


		}

		function removeHint(){
			var currentPage = pages.filter('.current');
			var hint = currentPage.children('.hint');
			if(hint.length){
				hint.remove();
			}
		}

		function showHint(message){
			var currentPage = pages.filter('.current');
			removeHint();
			var hint = $('<div class="hint"></div>');
			hint.append('<div class="info"></div>')
			hint.append(['<div class="message">',message,'</div>'].join(''))
			currentPage.children('.content').before(hint);

		}

		function validateCurrentPage(){
			var result = true;
			console.info('validate current page');
			var content = pages.filter('.current').children('.content');
			var selector = ['[name="','title','"]'].join('');
			var field = content.find(selector);
			if(field.length>0){
				if(field.val() === ''){
					showHint("One or more fields are invalid");
					result = false;
				}
			}

			selector = ['[name="','otherField','"]'].join('');
			field = content.find(selector);
			if(field.length>0){
				if(field.val() === ''){
					showHint("One or more fields are invalid");
					result = false;
				}
			}

			return result;
		}

		function update(context){
			function process(context, fieldName, field){
				context[fieldName] = field.val();
			}
			var content = pages.filter('.current').children('.content');
			content.find('input').each(function(index, element){
				var field = $(element);
				var fieldName = field.attr('name');
				if(context[fieldName] !== undefined){
					process(context, fieldName, field);
				}
			});
		}

		function use(context){
			function process(field, value){
				field.val(value);
			}
			var content = pages.filter('.current').children('.content');
			for(var fieldName in context){
				var selector = ['[name="',fieldName,'"]'].join('');
				var field = content.find(selector);
				process(field, context[fieldName]);

			}

		}

		function isOverview(){
			return isPage('page-overview');
		}

		function isPage(id){
			var result = false;
			var currentPage = pages.filter('.current');
			if(currentPage.attr('data-pageid') === id){
				result = true;
			}
			return result;
		}

		function IsPersistPage(){
			return isPage('page-persist');
		}

		function generateOverview(){
			var content = pages.filter('.current').children('.content');
			content.empty();
			for(var field in context){
				var value = context[field];
				value = value === '' ? '&nbsp;' : value;
				content.append(['<div class="field"><div class="label">', field,'</div><div class="value">', value ,'</div></div>'].join(''))
			}
		}

		navLeft.click(function(){
			if(!$(this).hasClass('disabled')){
				var direction = -1;
				if(canNavigate(direction)){
					update(context);
					navigate(direction);
					removeHint();
					use(context);
				}
			}
		});

		navRight.click(function(){
			if(!$(this).hasClass('disabled')){
				var direction = 1;
				if(canNavigate(direction)){
					update(context);
					navigate(direction);
					if(isOverview()){
						generateOverview();
					}
					removeHint();
					use(context);
				}
			}
		});

	/*	(function init(){
			navigate(0);
			use(context);

			var cl = new CanvasLoader('canvasloader-container');
			cl.setColor('#4abcce'); // default is '#000000'
			cl.setShape('spiral'); // default is 'oval'
			cl.setDiameter(81); // default is 40
			cl.setDensity(38); // default is 40
			cl.setRange(0.8); // default is 1.3
			cl.setSpeed(1); // default is 2
			cl.setFPS(22); // default is 24
			cl.show(); // Hidden by default

		})();


	});
*/


scope.labs = scope.labs || {};
scope.labs.Wizard = scope.labs.Wizard || function(element){
	var $wizard = $(element);
	var template = {
			pages : '<div class="pages"></div>',
			navigationLeft: '<div class="navigation left"><div class="arrow"></div></div>',
			navigationRight: '<div class="navigation right"><div class="arrow"></div></div>',
			progress: '<div class="navigation process"><header><h2>Steps<h2></header><ul class="steps"></ul></div>',
			step: function generateStepHtml(message, refId){
				var result = '<li class="step" data-pageref=' + refId + '>';
				result +='<div class="icon"></div>';
				result +='<div class="title">' + message + '</div>';
				result +='</li>';
				return result;
			}
	};

	var viewFactory = {
		create: function($container){
			var view = {container: $container};
			view.container.addClass('wizard');
			// prepare pages
			view.pages = view.container.children();
			view.pages.wrapAll(template.pages);
			view.pages.addClass('page');
			view.pages.each(function(index, element){
				$(this).attr('data-pageid', 'page-' + index);
			});
			view.pages.filter(':first').addClass('current');

			var pagesContainer = view.container.find('.pages');

			// generate progress bar
			view.progress = $(template.progress);
			pagesContainer.after(view.progress);
			var steps = view.progress.find('.steps');
			view.pages.each(function(index, element){
				var currentPage = $(this);
				var pageId = currentPage.attr('data-pageid');
				var pageTitle = currentPage.children(':first').text();
				steps.append(template.step(pageTitle, pageId));
			});

			// generate navigation
			view.navLeft = $(template.navigationLeft);
			view.navRight = $(template.navigationRight);
			pagesContainer.before(view.navLeft);
			pagesContainer.after(view.navRight);

			return view;
		}
	};

	var view = viewFactory.create($wizard);

	var viewModelFactory = {
		create: function createViewModel(view){
			var pageValidator = function placeHolder(){};

			view.navLeft.click(function(){

			});
			
			return {
				registerValidator: function registerPageValidator(validator){
					pageValidator = validator;
				},
				unregisterValidator: function(){
					pageValidator = function palceHolder(){};
				}
			};
		}
	};

	var viewModel = viewModelFactory.create(view);



	return viewModel;
};


$(function(){
	var wizard = new labs.Wizard('.foo');
	wizard.registerValidator(function validatePage(page, index){
		return true;
	});
});

})(window);
