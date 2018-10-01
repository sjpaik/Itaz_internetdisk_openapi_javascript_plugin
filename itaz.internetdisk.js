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
						baseHtml += "<div class='input-box'></div>";
				 		baseHtml += "<div class='col-xs-12 col-sm-6 col-md-6'>";
				 		baseHtml += "<div class='icon-bar'>";
				 		baseHtml += "<div class='icon btn' data-action='btnHome'>";
				 		baseHtml += "<div class='icon-img'><span class='glyphicon glyphicon-home'></span></div>";
				 		baseHtml += "<div class='icon-text'>홈</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='icon btn' data-action='btnRegister'>";
				 		baseHtml += "<div class='icon-img'><span class='glyphicon glyphicon-ok'></span></div>";
				 		baseHtml += "<div class='icon-text'>파일등록</div>";
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
				 		baseHtml += "<div class='icon-text'>등록해제</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='panel panel-default'>";
				 		baseHtml += "<div class='panel-heading path-bar'>등록된 파일<span></span></div>";
				 		baseHtml += "<div class='panel-body'>";
				 		baseHtml += "<ul class='file-list upload-file-list'>";
				 		baseHtml += "<li class='text-center'>웹핟에서 파일을 선택하신 후 등록해주세요.</li>";
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

 					sessionStorage.setItem("webhard-session-key", "250");
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
										"index": respJSON.FolderIndex[i],
										"name": respJSON.Name[i],
										"description": respJSON.Description[i],
										"folder-type": respJSON.FolderType[i],
										"member-join-type": respJSON.MemberJoinType[i],
										"auth": respJSON.Auth[i],
										"function-auth": respJSON.FunctionAuth[i],
										"disk-type": respJSON.DiskType[i]
									}, 0);
									pointer.append($li);
								}
							} else {
								// unhandle Error Block;
							}
						});
 						//functions.sync(self);
 					});
 					self.find("[data-action=btnRegister]").click(function(){
 						var parent = $(this).closest("div[data-role=webhard");
 						var len = parent.find(".webhard-file-list").find(".selected").length;
 						if(len == 0){
 							alert("선택된 파일이 없습니다.");
 							return false;
 						}
 						parent.find(".webhard-file-list").find(".selected").each(function(){
 							var $this = $(this);
 							var $input1 = $("<input>").attr({
 								"class": "file-" + $this.data("index"),
 								"type": "hidden",
 								"name": "fileIndexArr",
 								"value": $this.data("index")
 							}).data($this.data());
 							var $input2 = $("<input>").attr({
 								"class": "file-" + $this.data("index"),
 								"type": "hidden",
 								"name": "fileDivCdArr",
 								"value": parent.data("fileDivCd")
 							});
 							var $input3 = $("<input>").attr({
 								"class": "file-" + $this.data("index"),
 								"type": "hidden",
 								"name": "fileNameArr",
 								"value": parent.data("name")
 							});
 							parent.find(".input-box").append($input1, $input2, $input3);
 						});
 						functions.sync(parent);
 					});
 					self.find("[data-action=btnRemove]").click(function(){
 						var parent = $(this).closest("div[data-role=webhard");
 						var len = parent.find(".upload-file-list").find(".selected").length;
 						if(len == 0){
 							alert("선택된 파일이 없습니다.");
 							return false;
 						}
 						parent.find(".webhard-file-list").find(".selected").each(function(){
 							$(".file-" + $(this).data("index")).remove();
 						});
 						
 						functions.sync(parent);
 					});
 				},
 				sync: function(obj){
 					var self = obj.find(".input-box");
 					var target = obj.find(".upload-file-list");
 					target.empty();

 					if(self.find("input[name=fileIndexArr]").length == 0){
 						var element = $("<li>").addClass("text-center").text("웹하드에서 파일을 선택하신 후 등록해주세요.");
 						target.append(element);
 						return false;
 					}

 					self.find("input[name=fileIndexArr]").each(function(){
 						var data = $(this).data();
 						var element = $("<li>").data(data);
						var glyphicon = $("<span>").addClass("glyphicon glyphicon-ok");
						var text = $("<span>").text(data.name);
						element.append(glyphicon, text).click(function(){
							var $this = $(this);
							var self = $this.closest("li");
							if(self.hasClass("selected")){
								self.removeClass("selected");
							}
							else {
								self.addClass("selected");
							}
						});
						target.append(element);
 					});
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
 				elementGenerator: function(obj, type){
 					switch(type){
 						case 0:
 							var element = $("<li>").addClass("folder");
							var glyphicon = $("<span>").addClass("glyphicon glyphicon-hdd");
							var text = $("<span>").text(obj.name);
							element.append(glyphicon, text)
								.data(obj)
								.click(function(){
									var $this = $(this);
									var self = $this.closest("div[data-role=webhard]");
			 						functions.checkSessionKey();
			 						var data = {
			 							SessionIndex: sessionStorage.getItem("webhard-session-key"),
			 							FolderIndex: $this.data("index"),
			 							IncludeSelf: "2",
			 							ClientType: "9"
			 						};
			 						var res = functions.callApi(self, "/api.get_filefolderlist", data);
									res.done(function(){
										var respJSON = res.responseJSON;
										if(respJSON.result == 0){
											var pointer = self.find(".webhard-file-list");
											pointer.empty();
											for(var i = 0; i < respJSON.arraySize; i++){
												var $li = functions.elementGenerator({
													"index": respJSON.FFI[i],
													"name": respJSON.N[i],
													"folder-type": respJSON.FFT[i],
													"self-auth": respJSON.SelfAuth,
													"self-function-auth": respJSON.SelfFunctionAuth,
													"self-folder-state": respJSON.SelfFolderState,
													"ffi": respJSON.FFI[i],
													"pfi": respJSON.PFI[i],
													"n": respJSON.N[i],
													"d": respJSON.D[i],
													"t": respJSON.T[i],
													"s": respJSON.S[i],
													"mti": respJSON.MTi[i],
													"si": respJSON.Si[i],
													"us": respJSON.US[i],
													"fft": respJSON.FFT[i],
													"a": respJSON.A[i],
													"fa": respJSON.FA[i],
													"ft": respJSON.FT[i],
													"pt": respJSON.PT[i]
												}, respJSON.FFT[i]);
												pointer.append($li);
											}
										} else {
											// unhandle Error Block;
										}
									});
			 						//functions.sync(self);
								});
							return element;
						break;
 						case 1:
 							var element = $("<li>").addClass("folder");
							var glyphicon = $("<span>").addClass("glyphicon glyphicon-folder-open");
							var text = $("<span>").text(obj.name);
							element.append(glyphicon, text)
								.data(obj)
								.click(function(){
									var $this = $(this);
									var self = $this.closest("div[data-role=webhard]");
			 						functions.checkSessionKey();
			 						var data = {
			 							SessionIndex: sessionStorage.getItem("webhard-session-key"),
			 							FolderIndex: $this.data("index"),
			 							IncludeSelf: "2",
			 							ClientType: "9"
			 						};
			 						var res = functions.callApi(self, "/api.get_filefolderlist", data);
									res.done(function(){
										var respJSON = res.responseJSON;
										if(respJSON.result == 0){
											var pointer = self.find(".webhard-file-list");
											pointer.empty();
											for(var i = 0; i < respJSON.arraySize; i++){
												var $li = functions.elementGenerator({
													"index": respJSON.FFI[i],
													"name": respJSON.N[i],
													"folder-type": respJSON.FFT[i],
													"self-auth": respJSON.SelfAuth,
													"self-function-auth": respJSON.SelfFunctionAuth,
													"self-folder-state": respJSON.SelfFolderState,
													"ffi": respJSON.FFI[i],
													"pfi": respJSON.PFI[i],
													"n": respJSON.N[i],
													"d": respJSON.D[i],
													"t": respJSON.T[i],
													"s": respJSON.S[i],
													"mti": respJSON.MTi[i],
													"si": respJSON.Si[i],
													"us": respJSON.US[i],
													"fft": respJSON.FFT[i],
													"a": respJSON.A[i],
													"fa": respJSON.FA[i],
													"ft": respJSON.FT[i],
													"pt": respJSON.PT[i]
												}, respJSON.FFT[i]);
												pointer.append($li);
											}
										} else {
											// unhandle Error Block;
										}
									});
			 						//functions.sync(self);
								});
							return element;
						break;
 						case 2:
 							var element = $("<li>");
							var glyphicon = $("<span>").addClass("glyphicon glyphicon-file");
							var text = $("<span>").text(obj.name);
							element.append(glyphicon, text)
								.data(obj)
								.click(function(){
									var $this = $(this);
									var self = $this.closest("li");
									if(self.hasClass("selected")){
										self.removeClass("selected");
									}
									else {
										self.addClass("selected");
									}
								});
							return element;
 						break;
 						case 3:
 							var element = $("<li>").addClass("folder");
							var glyphicon = $("<span>").addClass("glyphicon glyphicon-folder-open");
							var text = $("<span>").text("..");
							element.append(glyphicon, text)
								.data(obj)
								.click(function(){
									var $this = $(this);
									var self = $this.closest("div[data-role=webhard]");
			 						functions.checkSessionKey();
			 						var data = {
			 							SessionIndex: sessionStorage.getItem("webhard-session-key"),
			 							FolderIndex: $this.data("index"),
			 							IncludeSelf: "2",
			 							ClientType: "9"
			 						};
			 						var res = functions.callApi(self, "/api.get_filefolderlist", data);
									res.done(function(){
										var respJSON = res.responseJSON;
										if(respJSON.result == 0){
											var pointer = self.find(".webhard-file-list");
											pointer.empty();
											for(var i = 0; i < respJSON.arraySize; i++){
												var $li = functions.elementGenerator({
													"index": respJSON.FFI[i],
													"name": respJSON.N[i],
													"folder-type": respJSON.FFT[i],
													"self-auth": respJSON.SelfAuth,
													"self-function-auth": respJSON.SelfFunctionAuth,
													"self-folder-state": respJSON.SelfFolderState,
													"ffi": respJSON.FFI[i],
													"pfi": respJSON.PFI[i],
													"n": respJSON.N[i],
													"d": respJSON.D[i],
													"t": respJSON.T[i],
													"s": respJSON.S[i],
													"mti": respJSON.MTi[i],
													"si": respJSON.Si[i],
													"us": respJSON.US[i],
													"fft": respJSON.FFT[i],
													"a": respJSON.A[i],
													"fa": respJSON.FA[i],
													"ft": respJSON.FT[i],
													"pt": respJSON.PT[i]
												}, respJSON.FFT[i]);
												pointer.append($li);
											}
										} else {
											// unhandle Error Block;
										}
									});
			 						//functions.sync(self);
								});
							return element;
						break;
 					}
 				}
 			};
 			functions.init.apply(this, arguments);
 		}
 	});

})(jQuery, this);