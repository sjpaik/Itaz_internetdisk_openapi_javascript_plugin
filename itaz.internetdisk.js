/*
 * Estsoft Internetdisk 7.0 OpenApi Javascript Plugin
 * Create by sjpaik, 18.09.28
 */

(function($, window){
 	"use strict";
 	$.fn.extend({
 		webhard: function(){
 			var values = {};
 			var functions = {
 				init: function() {
 					var baseHtml = "";
				 		baseHtml += "<div class='file-uploader'>";
						baseHtml += "<div class='loading-box'><div class='loading-text'>Loading...</div></div>";
						baseHtml += "<div class='input-box'></div>";
				 		baseHtml += "<div class='col-xs-12 col-sm-6 col-md-6' style='padding:0'>";
				 		baseHtml += "<div class='panel panel-default' style='margin-bottom:0'>";
				 		baseHtml += "<div class='panel-heading' style='height:40px;'>";
				 		baseHtml += "<div class='webhard-login-box text-center' style='display:none;'>";
				 		baseHtml += "<span class='glyphicon glyphicon-user'></span> <input type='text' class='webhard-login-id' placeholder='아이디' />";
				 		baseHtml += "<span class='glyphicon glyphicon-lock'></span> <input type='password' class='webhard-login-pwd' placeholder='비밀번호' />";
    					baseHtml += "<button type='button' class='btn btn-xs btn-default' data-action='btnWebhardLogin'>로그인</button>";
						baseHtml += "</div>";
						baseHtml += "<div class='webhard-status' style='display:none;'>";
						baseHtml += "<span>Webhard - </span>";
						baseHtml += "<span class='status'></span> ";
						baseHtml += "<button type='button' class='btn btn-xs btn-default' data-action='btnWebhardLogout'>로그아웃</button>";
						baseHtml += "</div>";
				 		baseHtml += "</div>";
						baseHtml += "<div class='panel-heading' style='padding:0'>";
						baseHtml += "<div class='icon-bar'>";
				 		baseHtml += "<div class='icon btn' data-action='btnHome'>";
				 		baseHtml += "<div class='icon-img'><span class='glyphicon glyphicon-home'></span></div>";
				 		baseHtml += "<div class='icon-text'>웹하드 홈</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='icon btn' data-action='btnRegister'>";
				 		baseHtml += "<div class='icon-img'><span class='glyphicon glyphicon-ok'></span></div>";
				 		baseHtml += "<div class='icon-text'>파일등록</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='panel-body' style='padding:0'>";
				 		baseHtml += "<ul class='file-list webhard-file-list'>";
				 		baseHtml += "<li class='text-center none'>웹하드에 로그인해주세요.</li>";
				 		baseHtml += "</ul>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='col-xs-12 col-sm-6 col-md-6' style='padding:0 0 0 5px'>";
				 		baseHtml += "<div class='panel panel-default' style='margin-bottom:0'>";
				 		baseHtml += "<div class='panel-heading path-bar' style='height:40px;'>등록된 파일<span></span></div>";
				 		baseHtml += "<div class='panel-heading' style='padding:0;'>";
						baseHtml += "<div class='icon-bar'>";
				 		baseHtml += "<div class='icon btn' data-action='btnRemove'>";
				 		baseHtml += "<div class='icon-img'><span class='glyphicon glyphicon-remove'></span></div>";
				 		baseHtml += "<div class='icon-text'>등록해제</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "<div class='panel-body' style='padding:0'>";
				 		baseHtml += "<ul class='file-list upload-file-list'>";
				 		baseHtml += "<li class='text-center none'>웹하드에서 파일을 선택하신 후 등록해주세요.</li>";
				 		baseHtml += "</ul>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";
				 		baseHtml += "</div>";

				 	var connectUrl = arguments[0].connectUrl;
				 	if(connectUrl != null && typeof connectUrl != "undefined") values.url = connectUrl;

				 	this.each(function(){
				 		var $this = $(this);
		 				$this.append(baseHtml);
		 				var storedFiles = $this.data("storedFiles");
		 				if(storedFiles != ""){
		 					for(var i in storedFiles){
	 							var $input1 = $("<input>").attr({
	 								"class": "file-" + storedFiles[i].fileIndex,
	 								"type": "hidden",
	 								"name": "fileIndexArr",
	 								"value": storedFiles[i].fileIndex
	 							}).data({
	 								"index": storedFiles[i].fileIndex,
									"name": storedFiles[i].fileName,
									"folder-type": 2
	 							});
	 							var $input2 = $("<input>").attr({
	 								"class": "file-" + storedFiles[i].fileIndex,
	 								"type": "hidden",
	 								"name": "fileDivCdArr",
	 								"value": storedFiles[i].fileDivCd
	 							});
	 							var $input3 = $("<input>").attr({
	 								"class": "file-" + storedFiles[i].fileIndex,
	 								"type": "hidden",
	 								"name": "fileNameArr",
	 								"value": storedFiles[i].fileName
	 							});
	 							var $input4 = $("<input>").attr({
	 								"class": "file-" + storedFiles[i].fileIndex,
	 								"type": "hidden",
	 								"name": "webLinkArr",
	 								"value": storedFiles[i].webLink
	 							});
	 							var $input5 = $("<input>").attr({
	 								"class": "file-" + storedFiles[i].fileIndex,
	 								"type": "hidden",
	 								"name": "previewLinkArr",
	 								"value": storedFiles[i].previewLink
	 							});
	 							$this.find(".input-box").append($input1, $input2, $input3, $input4, $input5);
		 					}
		 					functions.sync($this);
		 				}
		 			});

				 	functions.render();
		 			var sessionKey = functions.getSessionKey();
		 			if(sessionKey != null){
		 				$("[data-action=btnHome]").trigger("click");
		 			}
 				},
 				render: function(){
					$("[data-action=btnHome]").click(function(){
						var sessionKey = functions.getSessionKey();
						if(sessionKey == null) {
							alert("웹하드에 로그인해주세요.");
							return false;
						}

						var parent = $(this).closest("div[data-role=webhard]");
 						var data = {
 							SessionIndex : sessionKey,
 							ClientType: "9"
 						};
						var res = functions.callApi(parent, "/api.get_rootfolderlist", data);
						res.done(function(){
							parent.find(".status").text("Logged in");
							var respJSON = res.responseJSON;
							if(respJSON.result == 0){
								var target = parent.find(".webhard-file-list");
								target.empty();
								if(respJSON.arraySize > 0){
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
										target.append($li);
									}
								} else {
									target.append("<li class='text-center none'>웹하드 드라이브가 없습니다.</li>");
								}
							} else {
								alert("기타 - 알수없는 오류입니다. (" + respJSON.result + ")");
							}
						});
 					});
 					$("[data-action=btnRegister]").click(function(){
 						var sessionKey = functions.getSessionKey();
						if(sessionKey == null) {
							alert("웹하드에 로그인해주세요.");
							return false;
						}

 						var parent = $(this).closest("div[data-role=webhard");
 						var len = parent.find(".webhard-file-list").find(".selected").length;
 						if(len == 0){
 							alert("선택된 파일이 없습니다.");
 							return false;
 						}

 						parent.find(".webhard-file-list").find(".selected").each(function(){
 							var $this = $(this);
 							var index = $this.data("index");
 							$this.removeClass("selected");
 							if(!$this.hasClass("registered")){
 								var data = {
									SessionIndex : functions.getSessionKey(),
		 							FileIndex: index,
		 							ExpireDateTime: "",
		 							LimitDownCount: 0
 								};
 								var res = functions.callApi(parent, "/api.create_publink", data);
 								res.done(function(){
									var respJSON = res.responseJSON;
									if(respJSON.result == 0){
										var webLink = respJSON.URL[0];
										var data2 = {
											SessionIndex : functions.getSessionKey(),
				 							FileIndex: index,
				 							LanguageType: 1,
				 							PreviewType: 1
		 								};
										var res2 = functions.callApi(parent, "/api.get_publink_preview", data2);
										res2.done(function(){
											var respJSON2 = res2.responseJSON;
											if(respJSON2.result == 0 || respJSON2.result == 71){
												var previewLink = "";
												if(respJSON2.result == 0){
													previewLink = respJSON2.URL[0]
												}
												
												var $input1 = $("<input>").attr({
					 								"class": "file-" + index,
					 								"type": "hidden",
					 								"name": "fileIndexArr",
					 								"value": index
					 							}).data($this.data());
					 							var $input2 = $("<input>").attr({
					 								"class": "file-" + index,
					 								"type": "hidden",
					 								"name": "fileDivCdArr",
					 								"value": parent.data("fileDivCd")
					 							});
					 							var $input3 = $("<input>").attr({
					 								"class": "file-" + index,
					 								"type": "hidden",
					 								"name": "fileNameArr",
					 								"value": $this.data("name")
					 							});
					 							var $input4 = $("<input>").attr({
					 								"class": "file-" + index,
					 								"type": "hidden",
					 								"name": "webLinkArr",
					 								"value": webLink
					 							});
					 							var $input5 = $("<input>").attr({
					 								"class": "file-" + index,
					 								"type": "hidden",
					 								"name": "previewLinkArr",
					 								"value": previewLink
					 							});
					 							parent.find(".input-box").append($input1, $input2, $input3, $input4, $input5);
					 							$this.addClass("registered");
					 							$this.find(".glyphicon").removeClass("glyphicon-file").addClass("glyphicon-ok");
					 							functions.sync(parent);
											}
		 								});
									}
 								});
	 						 }
 						});
 					});
 					$("[data-action=btnRemove]").click(function(){
 						var parent = $(this).closest("div[data-role=webhard]");
 						var len = parent.find(".upload-file-list").find(".selected").length;
 						if(len == 0){
 							alert("선택된 파일이 없습니다.");
 							return false;
 						}
 						parent.find(".upload-file-list").find(".selected").each(function(){
 							var index = $(this).data("index");
 							$(".file-" + index).remove();
 							parent.find(".registered").each(function(){
 								var self = $(this);
 								if(index == self.data("index")){
 									self.removeClass("registered");
 									self.find(".glyphicon").removeClass("glyphicon-ok").addClass("glyphicon-file");
 								}
 							});
 						});
 						functions.sync(parent);
 					});
				 	$("[data-action=btnWebhardLogin]").click(function(){
				 		var parent = $(this).closest("div[data-role=webhard]");
				 		var id = parent.find(".webhard-login-id").val().trim();
				 		if(id == ""){
				 			alert("아이디를 입력해주세요.");
				 			parent.find(".webhard-login-id").focus();
				 			return false;
				 		}

				 		var password = parent.find(".webhard-login-pwd").val().trim();
				 		if(password == ""){
				 			alert("비밀번호를 입력해주세요.");
				 			parent.find(".webhard-login-pwd").focus();
				 			return false;
				 		}

				 		var data = {
 							ID: id,
 							Password: password,
 							ClientType: "9"
 						};

						var res = functions.callApi(parent, "/api.create_sessioninfo", data);
						res.done(function(){
							var respJSON = res.responseJSON;
							if(respJSON.result == 0){
								sessionStorage.setItem("webhard-session-key", respJSON.SessionIndex);
								parent.find(".webhard-login-id").val("");
								parent.find(".webhard-login-pwd").val("");
								$(".webhard-login-box").hide();
						 		$(".webhard-status").show();
						 		$("[data-action=btnHome]").trigger("click");
							} else if(respJSON.result == 47) {
								alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
							} else {
								alert("기타 - 알수없는 오류입니다. (" + respJSON.result + ")");
							}
						});
				 	});
				 	$("[data-action=btnWebhardLogout]").click(function(){
				 		sessionStorage.removeItem("webhard-session-key");
				 		functions.getSessionKey();
				 	});
 				},
 				sync: function(obj){
 					var self = obj.find(".input-box");
 					var target = obj.find(".upload-file-list");
 					target.empty();

 					if(self.find("input[name=fileIndexArr]").length == 0){
 						target.append("<li class='text-center none'>웹하드에서 파일을 선택하신 후 등록해주세요.</li>");
 						return false;
 					}

 					self.find("input[name=fileIndexArr]").each(function(){
 						var data = $(this).data();
 						var element = $("<li>").data(data);
						var text = $("<span>").text(data.name);
						element.append(text).click(function(){
							var $this = $(this);
							var self = $this.closest("li");
							if(self.hasClass("selected")){
								self.removeClass("selected");
							} else {
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
						beforeSend: function(xhr){
							obj.find(".loading-box").addClass("on");
						},
						error: function(request, status, error){
							console.log("##### response error #####");
							console.log(request);
							console.log("status : " + status);
							console.log("error : " + error);
							obj.find(".loading-text").text("Response Error - Status : " + status);
						},
						success: function(d){
							obj.find(".loading-box").removeClass("on");
						}
					});
 				},
 				getSessionKey: function(){
 					var sessionKey = sessionStorage.getItem("webhard-session-key");
 					if(sessionKey == null || typeof sessionKey == "undefined"){
 						$(".webhard-status").hide();
 						$(".webhard-login-box").show();
 						$(".webhard-file-list").empty().append("<li class='text-center none'>웹하드에 로그인해주세요.</li>");
 						sessionKey = null;
 					} else {
 						$(".webhard-login-box").hide();
 						$(".webhard-status").show();
 					}
 					return sessionKey;
 				},
 				elementGenerator: function(obj, type){
 					switch(type){
 						case 0:
 							var element = $("<li>").addClass("folder");
							var glyphicon = $("<span>").addClass("glyphicon glyphicon-hdd");
							var text = $("<span>").text(obj.name);
							element.append(glyphicon, text).data(obj).click(function(){
								var $this = $(this);
								var parent = $this.closest("div[data-role=webhard]");
		 						var sessionKey = sessionStorage.getItem("webhard-session-key");
		 						var data = {
		 							SessionIndex: sessionKey,
		 							FolderIndex: $this.data("index"),
		 							IncludeSelf: "2",
		 							ClientType: "9"
		 						};
		 						var res = functions.callApi(parent, "/api.get_filefolderlist", data);
								res.done(function(){
									var respJSON = res.responseJSON;
									if(respJSON.result == 0){
										var target = parent.find(".webhard-file-list");
										var indexArr = [];
										if(parent.find(".input-box input[name=fileIndexArr]").length > 0){
				 							parent.find(".input-box input[name=fileIndexArr]").each(function(){
				 								indexArr.push($(this).val());
				 							});
				 						}
										
										target.empty();
										if(respJSON.arraySize > 0){
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
													"pt": respJSON.PT[i],
													"indexArr": indexArr
												}, respJSON.FFT[i]);
												target.append($li);
											}
										} else {
											target.append("<li class='text-center text-danger none'>드라이브에 폴더또는 파일이 없습니다. '웹하드 홈'을 눌러주세요.");
										}
									} else {
										alert("기타 - 알수없는 오류입니다. (" + respJSON.result + ")");
									}
								});
							});
							return element;
						break;
 						case 1:
 							var element = $("<li>").addClass("folder");
							var glyphicon = $("<span>").addClass("glyphicon glyphicon-folder-open");
							var text = $("<span>").text(obj.name);
							element.append(glyphicon, text).data(obj).click(function(){
								var $this = $(this);
								var parent = $this.closest("div[data-role=webhard]");
		 						var sessionKey = functions.getSessionKey();
		 						var data = {
		 							SessionIndex: sessionKey,
		 							FolderIndex: $this.data("index"),
		 							IncludeSelf: "2",
		 							ClientType: "9"
		 						};
		 						var res = functions.callApi(parent, "/api.get_filefolderlist", data);
								res.done(function(){
									var respJSON = res.responseJSON;
									if(respJSON.result == 0){
										var target = parent.find(".webhard-file-list");
										var indexArr = [];
										if(parent.find(".input-box input[name=fileIndexArr]").length > 0){
				 							parent.find(".input-box input[name=fileIndexArr]").each(function(){
				 								indexArr.push($(this).val());
				 							});
				 						}

										target.empty();
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
												"pt": respJSON.PT[i],
												"indexArr": indexArr
											}, respJSON.FFT[i]);
											target.append($li);
										}
									} else {
										alert("기타 - 알수없는 오류입니다. (" + respJSON.result + ")");
									}
								});
							});
							return element;
						break;
 						case 2:
 							var index = obj.index;
 							var glyphicon = "glyphicon glyphicon-file";
 							var aClass = "";
 							var name = obj.name;
 							for(var i in obj.indexArr){
 								if(obj.indexArr[i] == index){
 									aClass = "registered";
 									glyphicon = "glyphicon glyphicon-ok";
 								}
 							}

 							var element = $("<li>").addClass(aClass);
							var glyphicon = $("<span>").addClass(glyphicon);
							var text = $("<span>").text(name);
							element.append(glyphicon, text).data(obj).click(function(){
								var $this = $(this);
								var parent = $this.closest("li");
								if(parent.hasClass("registered")){
									alert("이미 등록된 파일입니다.");
									return false;
								} else {
									if(parent.hasClass("selected")){
										parent.removeClass("selected");
									} else {
										parent.addClass("selected");
									}
								}
							});
							return element;
 						break;
 						case 3:
 							var element = $("<li>").addClass("folder");
							var glyphicon = $("<span>").addClass("glyphicon glyphicon-folder-open");
							var text = $("<span>").text("..");
							element.append(glyphicon, text).data(obj).click(function(){
								var $this = $(this);
								var parent = $this.closest("div[data-role=webhard]");
		 						var sessionKey = functions.getSessionKey();
		 						var data = {
		 							SessionIndex: sessionKey,
		 							FolderIndex: $this.data("index"),
		 							IncludeSelf: "2",
		 							ClientType: "9"
		 						};
		 						var res = functions.callApi(parent, "/api.get_filefolderlist", data);
								res.done(function(){
									var respJSON = res.responseJSON;
									if(respJSON.result == 0){
										var target = parent.find(".webhard-file-list");
										var indexArr = [];
										if(parent.find(".input-box input[name=fileIndexArr]").length > 0){
				 							parent.find(".input-box input[name=fileIndexArr]").each(function(){
				 								indexArr.push($(this).val());
				 							});
				 						}

										target.empty();
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
												"pt": respJSON.PT[i],
												"indexArr": indexArr
											}, respJSON.FFT[i]);
											target.append($li);
										}
									} else {
										alert("기타 - 알수없는 오류입니다. (" + respJSON.result + ")");
									}
								});
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