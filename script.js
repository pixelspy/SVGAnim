var timeLeft = 100;
var elem = document.getElementById('timer');

var timerId = setInterval(countdown, 1000);

function countdown() {
	if (timeLeft == 0) {
		clearTimeout(timerId);
	} else {
		// elem.innerHTML = timeLeft;
		timeLeft--;
	}
};

function modalContent1() {
	if (timeLeft >= 60) {
		document.getElementById("winner").innerHTML = "Bravo ! La nouvelle année commence bien ! ";
		document.getElementById("winner30").innerHTML = "Tu seras prochainement contacté par l’équipe SimplonProd pour découvrir ton cadeau.";
		document.getElementById("btnEnd").innerHTML = "Recevoir son cadeau";
		document.getElementById("lienBtnEnd").href = "http://prod.simplon.co/challenge-santaprod//";


	}
};

function modalContent2() {
	if (timeLeft <= 60) {
		document.getElementById("winner").innerHTML = "Bravo !";
		document.getElementById("winner30").innerHTML = "Tu as réussi le jeu mais tu dois encore progresser pour passer sous la barre des 35 secondes !";
		document.getElementById("btnEnd").innerHTML = "Recommencer";
		document.getElementById("lienBtnEnd").href = "./jeu.html";

	}
};
//
// (function(){
//     $('#wrapperBtn').click(function(e){
//         $(this).addClass('dark');
//         var x = e.pageX + 'px';
//         var y = e.pageY + 'px';
//         var img = $('<div class="blip"></div>');
//         var div = $('<div class="blip">').css({
//             "position": "absolute",
//             "left": x,
//             "top": y
//         });
//         div.append(img);
//         $('#wrapperBtn').append(div);
// 				setTimeout(function(){
//         $('#wrapperBtn').removeClass('dark');
//
//       }, 1250);
//     });
//
// });


(function(){

	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},

		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			modalContent1();
			// modalContentBtn1();
			modalContent2();
			// modalContentBtn2();
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://pbs.twimg.com/profile_images/838693954078052352/GfIzrvuA_400x400.jpg"\
				alt="SimplonProd" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "turing",
			img: "./img/informaticien-1-turing.png",
			id: 1
		},
		// {
		// 	name: "lee",
		// 	img: "./img/informaticien-2-berners-lee.png",
		// 	id: 2
		// },
		// {
		// 	name: "hopper",
		// 	img: "./img/informaticien-3-hopper.png",
		// 	id: 3
		// },
		// {
		// 	name: "lovelace",
		// 	img: "./img/informaticien-4-lovelace.png",
		// 	id: 4
		// },
		// {
		// 	name: "babbage",
		// 	img: "./img/informaticien-5-Babbage.png",
		// 	id: 5
		// },
		// {
		// 	name: "stroustrup",
		// 	img: "./img/informaticien-6-stroustrup.png",
		// 	id: 6
		// },
		// {
		// 	name: "ritchie",
		// 	img: "./img/informaticien-7-ritchie.png",
		// 	id: 7
		// },
		// {
		// 	name: "?",
		// 	img: "./img/informaticien-8-??.png",
		// 	id: 8
		// },
		// {
		// 	name: "torsvalds",
		// 	img: "./img/informaticien-9-torsvlads.jpg",
		// 	id: 9
		// },
		// {
		// 	name: "solo",
		// 	img: "./img/informaticien-10-solo.jpg",
		// 	id: 10
		// },
	];

	Memory.init(cards);


})();
