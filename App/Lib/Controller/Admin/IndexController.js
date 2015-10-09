/**
* controller
* @return
*/
module.exports = Controller("Admin/BaseController", function(){
		"use strict";
		return {
			indexAction: function(){
				var self=this;
				self.assign("model","index");
				self.assign("action","index");				
				return self.display();
			}
		};
	});