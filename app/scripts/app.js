(function(scope){

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
			if(newCurrentPageIndex >= 0){
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
			var result = false;
			var currentPage = pages.filter('.current');
			if(currentPage.attr('data-pageid') === 'page-overview'){
				result = true;
			}
			return result;
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

		(function init(){
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

})(window);