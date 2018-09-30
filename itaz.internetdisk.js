/*
 * Estsoft Internetdisk 7.0 OpenApi Javascript Plugin
 * Create by sjpaik, 18.09.28
 */

(function($, window){
 	"use strict";
 	$.fn.extend({
 		webhard: function(){
 			var values = {
 				url: null
 			};

 			var functions = {
 				init: function() {
 					var baseHtml = "";
				 		baseHtml += "<div class='file-uploader row'>";
						baseHtml += "<div class='loading-box'><div class='loading-text'>Loading...</div></div>";
				 		baseHtml += "<div class='col-xs-12 col-sm-6 col-md-6'>";
				 		baseHtml += "<div class='icon-bar'>";
				 		baseHtml += "<div class='icon btn' data-action='btnHome'>";
				 		baseHtml += "<div class='icon-img'><span class='glyphicon glyphicon-home'></span></div>";
				 		baseHtml += "<div class='icon-text'>홈</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='icon btn' data-action='btnParent'>";
				 		baseHtml += "<div class='icon-img'><span class='glyphicon glyphicon-arrow-up'></span></div>";
				 		baseHtml += "<div class='icon-text'>상위폴더</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='icon btn' data-action='btnRegister'>";
				 		baseHtml += "<div class='icon-img'><span class='glyphicon glyphicon-ok'></span></div>";
				 		baseHtml += "<div class='icon-text'>등록</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='panel panel-default'>";
				 		baseHtml += "<div class='panel-heading path-bar'></div>";
				 		baseHtml += "<div class='panel-body'>";
				 		baseHtml += "<ul class='file-list webhard-file-list'>";
				 		baseHtml += "</ul>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='col-xs-12 col-sm-6 col-md-6'>";
				 		baseHtml += "<div class='icon-bar'>";
				 		baseHtml += "<div class='icon btn' data-action='btnRemove'>";
				 		baseHtml += "<div class='icon-img'><span class='glyphicon glyphicon-remove'></span></div>";
				 		baseHtml += "<div class='icon-text'>삭제</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='panel panel-default'>";
				 		baseHtml += "<div class='panel-heading path-bar'>Upload Files - <span></span></div>";
				 		baseHtml += "<div class='panel-body'>";
				 		baseHtml += "<ul class='file-list upload-file-list'>";
				 		baseHtml += "</ul>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";

				 	var sessionKey = sessionStorage.getItem("webhard-session-key");
				 	
				 	if(sessionKey == null){

				 	} else {
				 		
				 	}

				 	/*
 					if(sessionKey == null){
 						var requestData = {
							ID: "000111",
							Password: "b82085d1e01806fc29af40d26c947aad0246744b078efb9e29d84b7162e33e0a6deb5fc8b314eddf209ee11cfc733cd138c59b7009e25fc40e6e732f0ba8e008",
							ClientType: "9"
						};
 					}
 					*/

 					sessionStorage.setItem("webhard-session-key", "101");
 					//sessionStorage.removeItem("webhard-session-key");

				 	var connectUrl = arguments[0].connectUrl;
				 	if(connectUrl != null && typeof connectUrl != "undefined") values.url = connectUrl;

				 	this.each(function(){
		 				$(this).append(baseHtml);
		 				functions.render.call($(this));
		 			});
 				},
 				render: function(){
 					var self = this;
					self.find("[data-action=btnHome]").click(function(){
						functions.checkSessionKey();
 						var data = {
 							SessionIndex : sessionStorage.getItem("webhard-session-key"),
 							ClientType: "9"
 						};
						var res = functions.callApi(self, "/api.get_rootfolderlist", data);
						res.done(function(){
							var respJSON = res.responseJSON;
							if(respJSON.result == 0){
								var pointer = self.find(".webhard-file-list");
								pointer.empty();
								for(var i = 0; i < respJSON.arraySize; i++){
									var $li = functions.elementGenerator({
										"folder-index": respJSON.FolderIndex[i],
										"name": respJSON.Name[i],
										"description": respJSON.Description[i],
										"folder-type": respJSON.FolderType[i],
										"member-join-type": respJSON.MemberJoinType[i],
										"auth": respJSON.Auth[i],
										"function-auth": respJSON.FunctionAuth[i],
										"disk-type": respJSON.DiskType[i]
									});

									$li.click(function(){
										// handle li element Block;
										console.log($(this).data());
									});

									pointer.append($li);
								}
							} else {
								// unhandle Error Block;
							}
						});
 						//functions.sync(self);
 					});
 					self.find("[data-action=btnParent]").click(function(){
 						functions.sync(self);
 					});
 					self.find("[data-action=btnRegister]").click(function(){
 						functions.sync(self);
 					});
 					self.find("[data-action=btnRemove]").click(function(){
 						functions.checkSessionKey();
 						var data = {
 							SessionIndex : sessionStorage.getItem("webhard-session-key"),
 							ClientType: "9"
 						};

 						var res = functions.callApi(self, "/api.get_rootfolderlist", data);
 						res.done(function(){
 							console.log("### response success ###");
 							console.log(res);
 						});
 					});
 				},
 				sync: function(obj){
 					console.log("### sync ###");
 					console.log(obj);
 				},
 				callApi: function(obj, url, data){
 					return $.ajax({
						url: values.url + url,
						type: "POST",
						dataType: "json",
						data: JSON.stringify(data),
						beforeSend: function(){
							obj.find(".loading-box").addClass("on");
						},
						error: function(request, status, error){
							console.log("##### response error #####");
							console.log(request);
							console.log("status : " + status);
							console.log("error : " + error);
							obj.find(".loading-box").text("Response Error - Status : " + status);
						},
						success: function(d){
							obj.find(".loading-box").removeClass("on");
						}
					});
 				},
 				checkSessionKey: function(){
 					var sessionKey = sessionStorage.getItem("webhard-session-key");
 					if(sessionKey == null || typeof sessionKey == "undefined"){
 						alert("sessionKey is null");
 						return false;
 					}
 				},
 				elementGenerator: function(obj){
 					var element = $("<li>");
					var glyphicon = $("<span>").addClass("glyphicon glyphicon-folder-open");
					var text = $("<span>").text(obj.name);
					element.append(glyphicon, text).data(obj);
					return element;
 				}
 			};
 			functions.init.apply(this, arguments);
 		}
 	});

})(jQuery, this);