// KLASA KANBAN CARD
function Card(id, name, columnId) {
	var self = this;
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();
	this.columnId = columnId;
	function createCard(card,columnId) {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		cardDescription.click(function(){
			self.changeNameCard(self.columnId);
		});
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
    	var self = this;
    	$.ajax({
      		url: baseUrl + '/card/' + self.id,
      		method: 'DELETE',
      		success: function(){
        		self.element.remove();
      		}
    	});
	},
	changeNameCard: function(columnId){
		var self = this;
		var newName = prompt('Enter new name of card');
		$.ajax({
    			url: baseUrl + '/card' + '/' + self.id,
    			method: 'PUT',
    			data: {
    				name: newName,
    				bootcamp_kanban_column_id: self.columnId
    			},
    			success: function(response) {
        			self.element.find('.card-description').text(newName);
    			}
			});
	}
}