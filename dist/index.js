(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/forms"), require("@angular/platform-browser"), require("angular2-modal"), require("cropperjs"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/common", "@angular/core", "@angular/forms", "@angular/platform-browser", "angular2-modal", "cropperjs"], factory);
	else if(typeof exports === 'object')
		exports["ngcrop"] = factory(require("@angular/common"), require("@angular/core"), require("@angular/forms"), require("@angular/platform-browser"), require("angular2-modal"), require("cropperjs"));
	else
		root["ngcrop"] = factory(root["@angular/common"], root["@angular/core"], root["@angular/forms"], root["@angular/platform-browser"], root["angular2-modal"], root["cropperjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_42__, __WEBPACK_EXTERNAL_MODULE_43__, __WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_44__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__(3);
var toSubscriber_1 = __webpack_require__(39);
var observable_1 = __webpack_require__(15);
/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is  called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Registers handlers for handling emitted values, error and completions from the observable, and
     *  executes the observable's subscriber function, which will take action to set up the underlying data stream
     * @method subscribe
     * @param {PartialObserver|Function} observerOrNext (optional) either an observer defining all functions to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the observable.
     * @param {Function} error (optional) a handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled
     * @param {Function} complete (optional) a handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this);
        }
        else {
            sink.add(this._subscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.$$observable] = function () {
        return this;
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {"use strict";
var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
};
exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
var freeGlobal = objectTypes[typeof global] && global;
if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = freeGlobal;
}
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_modal__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_modal__);
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return BSMessageModalTitle; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return BSMessageModalBody; });
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return BSModalFooter; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BSMessageModal; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */


var BSMessageModalTitle = (function () {
    function BSMessageModalTitle(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    Object.defineProperty(BSMessageModalTitle.prototype, "titleHtml", {
        get: function () {
            return this.context.titleHtml ? 1 : 0;
        },
        enumerable: true,
        configurable: true
    });
    BSMessageModalTitle.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'modal-title',
                    encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                    template: "<div [ngClass]=\"context.headerClass\" [ngSwitch]=\"titleHtml\">\n      <button *ngIf=\"context.showClose\" type=\"button\" class=\"close\" \n              aria-label=\"Close\" (click)=\"dialog.dismiss()\">\n          <span aria-hidden=\"true\">\u00D7</span>\n      </button>\n      <div *ngSwitchCase=\"1\" [innerHtml]=\"context.titleHtml\"></div>\n      <h3 *ngSwitchDefault class=\"modal-title\">{{context.title}}</h3>\n </div>"
                },] },
    ];
    /** @nocollapse */
    BSMessageModalTitle.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
    ];
    return BSMessageModalTitle;
}());
var BSMessageModalBody = (function () {
    function BSMessageModalBody(dialog) {
        this.dialog = dialog;
        this.context = dialog.context;
    }
    BSMessageModalBody.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'modal-body',
                    encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                    styles: [".form-group {\n    margin-top: 10px;\n  }"],
                    template: "<div [ngClass]=\"context.bodyClass\"> \n    <div [innerHtml]=\"context.message\"></div>\n      <div *ngIf=\"context.showInput\" class=\"form-group\">\n        <input autofocus #input\n            name=\"bootstrap\" \n            type=\"text\" \n            class=\"form-control\"\n            [value]=\"context.defaultValue\"\n            (change)=\"context.defaultValue = input.value\"  \n            placeholder=\"{{context.placeholder}}\">\n      </div>\n    </div>\n"
                },] },
    ];
    /** @nocollapse */
    BSMessageModalBody.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
    ];
    return BSMessageModalBody;
}());
/**
 * Represents the modal footer for storing buttons.
 */
var BSModalFooter = (function () {
    function BSModalFooter(dialog) {
        this.dialog = dialog;
    }
    BSModalFooter.prototype.onClick = function (btn, $event) {
        $event.stopPropagation();
        btn.onClick(this, $event);
    };
    BSModalFooter.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'modal-footer',
                    encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                    template: "<div [ngClass]=\"dialog.context.footerClass\">\n    <button *ngFor=\"let btn of dialog.context.buttons;\"\n            [ngClass]=\"btn.cssClass\"\n            (click)=\"onClick(btn, $event)\">{{btn.caption}}</button>\n</div>"
                },] },
    ];
    /** @nocollapse */
    BSModalFooter.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
    ];
    return BSModalFooter;
}());
/**
 * A Component representing a generic bootstrap modal content element.
 *
 * By configuring a MessageModalContext instance you can:
 *
 *  Header:
 *      - Set header container class (default: modal-header)
 *      - Set title text (enclosed in H3 element)
 *      - Set title html (overrides text)
 *
 *  Body:
 *      - Set body container class.  (default: modal-body)
 *      - Set body container HTML.
 *
 *  Footer:
 *      - Set footer class.  (default: modal-footer)
 *      - Set button configuration (from 0 to n)
 */
var BSMessageModal = (function () {
    function BSMessageModal(dialog) {
        this.dialog = dialog;
    }
    BSMessageModal.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'modal-content',
                    encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                    template: "<modal-title></modal-title><modal-body></modal-body><modal-footer></modal-footer>"
                },] },
    ];
    /** @nocollapse */
    BSMessageModal.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
    ];
    return BSMessageModal;
}());
//# sourceMappingURL=message-modal.component.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_modal__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_modal__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BSModalContainer; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var BSModalContainer = (function (_super) {
    __extends(BSModalContainer, _super);
    function BSModalContainer(dialog, el, renderer) {
        _super.call(this, el, renderer);
        this.dialog = dialog;
        this.activateAnimationListener();
    }
    BSModalContainer.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'bs-modal-container',
                    host: {
                        'tabindex': '-1',
                        'role': 'dialog',
                        'class': 'modal fade',
                        'style': 'position: absolute; display: block'
                    },
                    encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
                    template: "<div [ngClass]=\"dialog.context.dialogClass\" \n      [class.modal-lg]=\"dialog.context.size == 'lg'\"\n      [class.modal-sm]=\"dialog.context.size == 'sm'\">\n  <div class=\"modal-content\" style=\"display:block\" role=\"document\" overlayDialogBoundary>\n    <ng-content></ng-content>\n  </div>    \n</div>"
                },] },
    ];
    /** @nocollapse */
    BSModalContainer.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_1_angular2_modal__["DialogRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
    ];
    return BSModalContainer;
}(__WEBPACK_IMPORTED_MODULE_1_angular2_modal__["BaseDynamicComponent"]));
//# sourceMappingURL=modal-container.component.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_modal_component__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_context__ = __webpack_require__(10);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return MessageModalPresetBuilder; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



var DEFAULT_VALUES = {
    component: __WEBPACK_IMPORTED_MODULE_1__message_modal_component__["a" /* BSMessageModal */],
    headerClass: 'modal-header',
    bodyClass: 'modal-body',
    footerClass: 'modal-footer'
};
var DEFAULT_SETTERS = [
    'headerClass',
    'title',
    'titleHtml',
    'bodyClass',
    'footerClass'
];
/**
 * A Preset representing the configuration needed to open MessageModal.
 * This is an abstract implementation with no concrete behaviour.
 * Use derived implementation.
 */
var MessageModalPresetBuilder = (function (_super) {
    __extends(MessageModalPresetBuilder, _super);
    function MessageModalPresetBuilder(defaultValues, initialSetters, baseType) {
        if (defaultValues === void 0) { defaultValues = undefined; }
        if (initialSetters === void 0) { initialSetters = undefined; }
        if (baseType === void 0) { baseType = undefined; }
        _super.call(this, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])({ buttons: [] }, DEFAULT_VALUES), defaultValues || {}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["arrayUnion"])(DEFAULT_SETTERS, initialSetters || []), baseType);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["setAssignAlias"])(this, 'body', 'message', true);
    }
    MessageModalPresetBuilder.prototype.addButton = function (css, caption, onClick) {
        var btn = {
            cssClass: css,
            caption: caption,
            onClick: onClick
        };
        var key = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["privateKey"])('buttons');
        this[key].push(btn);
        return this;
    };
    return MessageModalPresetBuilder;
}(__WEBPACK_IMPORTED_MODULE_2__modal_context__["b" /* BSModalContextBuilder */]));
//# sourceMappingURL=message-modal-preset.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(18);
var Subscription_1 = __webpack_require__(27);
var Observer_1 = __webpack_require__(25);
var rxSubscriber_1 = __webpack_require__(16);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
        _super.call(this);
        this._parent = _parent;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            context = observerOrNext;
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (isFunction_1.isFunction(context.unsubscribe)) {
                this.add(context.unsubscribe.bind(context));
            }
            context.unsubscribe = this.unsubscribe.bind(this);
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parent = this._parent;
            if (!_parent.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parent, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._error) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parent.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parent.syncErrorValue = err;
                _parent.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        if (!this.isStopped) {
            var _parent = this._parent;
            if (this._complete) {
                if (!_parent.syncErrorThrowable) {
                    this.__tryOrUnsub(this._complete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parent, this._complete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parent = this._parent;
        this._context = null;
        this._parent = null;
        _parent.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modal_context__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modal_container_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__message_modal_component__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__presets_message_modal_preset__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_modal__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__presets_one_button_preset__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__presets_two_button_preset__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modal__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__bootstrap_module__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSModalContext", function() { return __WEBPACK_IMPORTED_MODULE_0__modal_context__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSModalContextBuilder", function() { return __WEBPACK_IMPORTED_MODULE_0__modal_context__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSModalContainer", function() { return __WEBPACK_IMPORTED_MODULE_1__modal_container_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSMessageModal", function() { return __WEBPACK_IMPORTED_MODULE_2__message_modal_component__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSMessageModalBody", function() { return __WEBPACK_IMPORTED_MODULE_2__message_modal_component__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSModalFooter", function() { return __WEBPACK_IMPORTED_MODULE_2__message_modal_component__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BSMessageModalTitle", function() { return __WEBPACK_IMPORTED_MODULE_2__message_modal_component__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "MessageModalPresetBuilder", function() { return __WEBPACK_IMPORTED_MODULE_3__presets_message_modal_preset__["a"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4_angular2_modal__, "ModalOpenContext")) __webpack_require__.d(exports, "ModalOpenContext", function() { return __WEBPACK_IMPORTED_MODULE_4_angular2_modal__["ModalOpenContext"]; });
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4_angular2_modal__, "ModalOpenContextBuilder")) __webpack_require__.d(exports, "ModalOpenContextBuilder", function() { return __WEBPACK_IMPORTED_MODULE_4_angular2_modal__["ModalOpenContextBuilder"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "OneButtonPresetBuilder", function() { return __WEBPACK_IMPORTED_MODULE_5__presets_one_button_preset__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "TwoButtonPresetBuilder", function() { return __WEBPACK_IMPORTED_MODULE_6__presets_two_button_preset__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "PromptPresetBuilder", function() { return __WEBPACK_IMPORTED_MODULE_6__presets_two_button_preset__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "Modal", function() { return __WEBPACK_IMPORTED_MODULE_7__modal__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "BootstrapModalModule", function() { return __WEBPACK_IMPORTED_MODULE_8__bootstrap_module__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "providers", function() { return __WEBPACK_IMPORTED_MODULE_8__bootstrap_module__["b"]; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */









//# sourceMappingURL=index.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BSModalContext; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return BSModalContextBuilder; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var DEFAULT_VALUES = {
    dialogClass: 'modal-dialog',
    showClose: false
};
var DEFAULT_SETTERS = [
    'dialogClass',
    'size',
    'showClose'
];
var BSModalContext = (function (_super) {
    __extends(BSModalContext, _super);
    function BSModalContext() {
        _super.apply(this, arguments);
    }
    BSModalContext.prototype.normalize = function () {
        if (!this.dialogClass) {
            this.dialogClass = DEFAULT_VALUES.dialogClass;
        }
        _super.prototype.normalize.call(this);
    };
    return BSModalContext;
}(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["ModalOpenContext"]));
var BSModalContextBuilder = (function (_super) {
    __extends(BSModalContextBuilder, _super);
    function BSModalContextBuilder(defaultValues, initialSetters, baseType) {
        if (defaultValues === void 0) { defaultValues = undefined; }
        if (initialSetters === void 0) { initialSetters = undefined; }
        if (baseType === void 0) { baseType = undefined; }
        _super.call(this, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])(DEFAULT_VALUES, defaultValues || {}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["arrayUnion"])(DEFAULT_SETTERS, initialSetters || []), baseType || BSModalContext // https://github.com/Microsoft/TypeScript/issues/7234
        );
    }
    return BSModalContextBuilder;
}(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["ModalOpenContextBuilder"]));
//# sourceMappingURL=modal-context.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_combineLatest__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_combineLatest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_combineLatest__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_modal__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_container_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bootstrap_presets_one_button_preset__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__bootstrap_presets_two_button_preset__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Modal; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal(overlay) {
        _super.call(this, overlay);
    }
    Modal.prototype.alert = function () {
        return new __WEBPACK_IMPORTED_MODULE_4__bootstrap_presets_one_button_preset__["a" /* OneButtonPresetBuilder */](this, { isBlocking: false });
    };
    Modal.prototype.prompt = function () {
        return new __WEBPACK_IMPORTED_MODULE_5__bootstrap_presets_two_button_preset__["b" /* PromptPresetBuilder */](this, { isBlocking: true, keyboard: null });
    };
    Modal.prototype.confirm = function () {
        return new __WEBPACK_IMPORTED_MODULE_5__bootstrap_presets_two_button_preset__["a" /* TwoButtonPresetBuilder */](this, { isBlocking: true, keyboard: null });
    };
    Modal.prototype.create = function (dialogRef, content, bindings) {
        var _this = this;
        var backdropRef = this.createBackdrop(dialogRef, __WEBPACK_IMPORTED_MODULE_2_angular2_modal__["CSSBackdrop"]);
        var containerRef = this.createContainer(dialogRef, __WEBPACK_IMPORTED_MODULE_3__modal_container_component__["a" /* BSModalContainer */], content, bindings);
        var overlay = dialogRef.overlayRef.instance;
        var backdrop = backdropRef.instance;
        var container = containerRef.instance;
        dialogRef.inElement ? overlay.insideElement() : overlay.fullscreen();
        // add body class if this is the only dialog in the stack
        if (!document.body.classList.contains('modal-open')) {
            document.body.classList.add('modal-open');
        }
        if (dialogRef.inElement) {
            backdrop.setStyle('position', 'absolute');
        }
        backdrop.addClass('modal-backdrop fade', true);
        backdrop.addClass('in');
        container.addClass('in');
        if (containerRef.location.nativeElement) {
            containerRef.location.nativeElement.focus();
        }
        overlay.beforeDestroy(function () {
            var completer = new __WEBPACK_IMPORTED_MODULE_2_angular2_modal__["PromiseCompleter"]();
            backdrop.removeClass('in');
            container.removeClass('in');
            backdrop.myAnimationEnd$()
                .combineLatest(container.myAnimationEnd$(), function (s1, s2) { return [s1, s2]; })
                .subscribe(function (sources) {
                _this.overlay.groupStackLength(dialogRef) === 1 && document.body.classList.remove('modal-open');
                completer.resolve();
            });
            return completer.promise;
        });
        return dialogRef;
    };
    Modal.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    Modal.ctorParameters = [
        { type: __WEBPACK_IMPORTED_MODULE_2_angular2_modal__["Overlay"], },
    ];
    return Modal;
}(__WEBPACK_IMPORTED_MODULE_2_angular2_modal__["Modal"]));
//# sourceMappingURL=modal.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_modal_preset__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return OneButtonPresetBuilder; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * A Preset for a classic 1 button modal window.
 */
var OneButtonPresetBuilder = (function (_super) {
    __extends(OneButtonPresetBuilder, _super);
    function OneButtonPresetBuilder(modal, defaultValues) {
        if (defaultValues === void 0) { defaultValues = undefined; }
        _super.call(this, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])({
            modal: modal,
            okBtn: 'OK',
            okBtnClass: 'btn btn-primary'
        }, defaultValues || {}), [
            'okBtn',
            'okBtnClass'
        ]);
    }
    OneButtonPresetBuilder.prototype.$$beforeOpen = function (config) {
        this.addButton(config.okBtnClass, config.okBtn, function (cmp, $event) { return cmp.dialog.close(true); });
        return _super.prototype.$$beforeOpen.call(this, config);
    };
    return OneButtonPresetBuilder;
}(__WEBPACK_IMPORTED_MODULE_1__message_modal_preset__["a" /* MessageModalPresetBuilder */]));
//# sourceMappingURL=one-button-preset.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular2_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__message_modal_preset__ = __webpack_require__(6);
/* unused harmony export AbstractTwoButtonPresetBuilder */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TwoButtonPresetBuilder; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return PromptPresetBuilder; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/** Common two button preset */
var AbstractTwoButtonPresetBuilder = (function (_super) {
    __extends(AbstractTwoButtonPresetBuilder, _super);
    function AbstractTwoButtonPresetBuilder(modal, defaultValues, initialSetters) {
        if (defaultValues === void 0) { defaultValues = undefined; }
        if (initialSetters === void 0) { initialSetters = []; }
        _super.call(this, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])({
            modal: modal,
            okBtn: 'OK',
            okBtnClass: 'btn btn-primary',
            cancelBtn: 'Cancel',
            cancelBtnClass: 'btn btn-default'
        }, defaultValues || {}), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["arrayUnion"])([
            'okBtn',
            'okBtnClass',
            'cancelBtn',
            'cancelBtnClass',
        ], initialSetters));
    }
    AbstractTwoButtonPresetBuilder.prototype.$$beforeOpen = function (config) {
        this.addButton(config.cancelBtnClass, config.cancelBtn, function (cmp, $event) { return cmp.dialog.dismiss(); });
        return _super.prototype.$$beforeOpen.call(this, config);
    };
    return AbstractTwoButtonPresetBuilder;
}(__WEBPACK_IMPORTED_MODULE_1__message_modal_preset__["a" /* MessageModalPresetBuilder */]));
/**
 * A Preset for a classic 2 button modal window.
 */
var TwoButtonPresetBuilder = (function (_super) {
    __extends(TwoButtonPresetBuilder, _super);
    function TwoButtonPresetBuilder(modal, defaultValues) {
        if (defaultValues === void 0) { defaultValues = undefined; }
        _super.call(this, modal, defaultValues);
    }
    TwoButtonPresetBuilder.prototype.$$beforeOpen = function (config) {
        this.addButton(config.okBtnClass, config.okBtn, function (cmp, $event) { return cmp.dialog.close(true); });
        return _super.prototype.$$beforeOpen.call(this, config);
    };
    return TwoButtonPresetBuilder;
}(AbstractTwoButtonPresetBuilder));
var PromptPresetBuilder = (function (_super) {
    __extends(PromptPresetBuilder, _super);
    function PromptPresetBuilder(modal, defaultValues) {
        if (defaultValues === void 0) { defaultValues = undefined; }
        _super.call(this, modal, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_angular2_modal__["extend"])({ showInput: true, defaultValue: '' }, defaultValues || {}), ['placeholder', 'defaultValue']);
    }
    PromptPresetBuilder.prototype.$$beforeOpen = function (config) {
        this.addButton(config.okBtnClass, config.okBtn, function (cmp, $event) {
            return cmp.dialog.close(cmp.dialog.context.defaultValue);
        });
        return _super.prototype.$$beforeOpen.call(this, config);
    };
    return PromptPresetBuilder;
}(AbstractTwoButtonPresetBuilder));
//# sourceMappingURL=two-button-preset.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var angular2_modal_1 = __webpack_require__(0);
var bootstrap_1 = __webpack_require__(9);
var ImageCropperModalContext = (function (_super) {
    __extends(ImageCropperModalContext, _super);
    function ImageCropperModalContext() {
        _super.apply(this, arguments);
    }
    return ImageCropperModalContext;
}(bootstrap_1.BSModalContext));
exports.ImageCropperModalContext = ImageCropperModalContext;
var ImageCropperModal = (function () {
    function ImageCropperModal(dialog) {
        this.dialog = dialog;
        this.context = this.dialog.context;
    }
    ImageCropperModal.prototype.ngOnInit = function () {
    };
    ImageCropperModal.prototype.ngOnDestroy = function () {
    };
    ImageCropperModal.prototype.saveData = function (data) {
        this.dialog.close(data);
    };
    ImageCropperModal = __decorate([
        core_1.Component({
            selector: 'image-cropper-modal',
            providers: [],
            // styleUrls: ['./image-cropper-modal.component.scss'],
            templateUrl: './image-cropper-modal.component.jade',
        }), 
        __metadata('design:paramtypes', [angular2_modal_1.DialogRef])
    ], ImageCropperModal);
    return ImageCropperModal;
}());
exports.ImageCropperModal = ImageCropperModal;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__(3);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.$$observable = getSymbolObservable(root_1.root);
//# sourceMappingURL=observable.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__(3);
var Symbol = root_1.root.Symbol;
exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
//# sourceMappingURL=rxSubscriber.js.map

/***/ },
/* 17 */
/***/ function(module, exports) {

"use strict";
"use strict";
// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

"use strict";
"use strict";
function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_19__;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(19);
var image_cropper_component_1 = __webpack_require__(22);
var input_image_crop_component_1 = __webpack_require__(23);
var image_cropper_modal_component_1 = __webpack_require__(14);
var angular2_modal_1 = __webpack_require__(0);
var NgCropModule = (function () {
    function NgCropModule() {
    }
    NgCropModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                angular2_modal_1.ModalModule,
            ],
            declarations: [
                image_cropper_component_1.ImageCropper,
                image_cropper_modal_component_1.ImageCropperModal,
                input_image_crop_component_1.InputImageCrop,
            ],
            exports: [
                image_cropper_component_1.ImageCropper,
                image_cropper_modal_component_1.ImageCropperModal,
                input_image_crop_component_1.InputImageCrop,
            ],
            entryComponents: [
                image_cropper_modal_component_1.ImageCropperModal,
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], NgCropModule);
    return NgCropModule;
}());
exports.NgCropModule = NgCropModule;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__angular_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__angular_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_modal__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_container_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__message_modal_component__ = __webpack_require__(4);
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return providers; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BootstrapModalModule; });
/**
 * angular2-modal - Angular2 Modal (dialog) window.
 * @version v2.0.1
 * @link https://github.com/shlomiassaf/angular2-modal
 * @license MIT
 */






var providers = [
    { provide: __WEBPACK_IMPORTED_MODULE_2_angular2_modal__["Modal"], useClass: __WEBPACK_IMPORTED_MODULE_3__modal__["a" /* Modal */] },
    { provide: __WEBPACK_IMPORTED_MODULE_3__modal__["a" /* Modal */], useClass: __WEBPACK_IMPORTED_MODULE_3__modal__["a" /* Modal */] }
];
var BootstrapModalModule = (function () {
    function BootstrapModalModule() {
    }
    BootstrapModalModule.getProviders = function () {
        return providers;
    };
    BootstrapModalModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    imports: [__WEBPACK_IMPORTED_MODULE_2_angular2_modal__["ModalModule"], __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
                    declarations: [
                        __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["c" /* BSModalFooter */],
                        __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["d" /* BSMessageModalTitle */],
                        __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["b" /* BSMessageModalBody */],
                        __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["a" /* BSMessageModal */],
                        __WEBPACK_IMPORTED_MODULE_4__modal_container_component__["a" /* BSModalContainer */]
                    ],
                    providers: providers,
                    entryComponents: [
                        __WEBPACK_IMPORTED_MODULE_4__modal_container_component__["a" /* BSModalContainer */],
                        __WEBPACK_IMPORTED_MODULE_5__message_modal_component__["a" /* BSMessageModal */]
                    ]
                },] },
    ];
    /** @nocollapse */
    BootstrapModalModule.ctorParameters = [];
    return BootstrapModalModule;
}());
//# sourceMappingURL=bootstrap.module.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var cropperjs_1 = __webpack_require__(44);
var core_1 = __webpack_require__(1);
var ImageCropper = (function () {
    function ImageCropper() {
        this.export = new core_1.EventEmitter();
        this.ready = new core_1.EventEmitter();
        this.isLoading = true;
    }
    ImageCropper.prototype.imageLoaded = function (ev) {
        var _this = this;
        this.loadError = false;
        var image = ev.target;
        this.imageElement = image;
        image.crossOrigin = 'anonymous';
        image.addEventListener('ready', function () {
            _this.ready.emit(true);
            _this.isLoading = false;
            if (_this.cropbox) {
                _this.cropper.setCropBoxData(_this.cropbox);
            }
        });
        this.cropper = new cropperjs_1.default(image, this.cropperOption);
    };
    ImageCropper.prototype.imageLoadError = function (event) {
        this.loadError = true;
        this.isLoading = false;
    };
    ImageCropper.prototype.exportCanvas = function (base64) {
        var _this = this;
        var imageData = this.cropper.getImageData();
        var cropData = this.cropper.getCropBoxData();
        var canvas = this.cropper.getCroppedCanvas();
        var data = {
            imageData: imageData,
            cropData: cropData,
        };
        var promise = new Promise(function (resolve) {
            if (base64) {
                return resolve({
                    dataUrl: canvas.toDataURL('image/png'),
                });
            }
            canvas.toBlob(function (blob) { return resolve({ blob: blob }); });
        });
        promise.then(function (res) {
            _this.export.emit(Object.assign(data, res));
        });
    };
    Object.defineProperty(ImageCropper.prototype, "cropperOption", {
        get: function () {
            var aspectRatio = NaN;
            if (this.settings) {
                var _a = this.settings, width = _a.width, height = _a.height;
                aspectRatio = width / height;
            }
            return {
                aspectRatio: aspectRatio,
                movable: false,
                scalable: false,
                zoomable: false,
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageCropper.prototype, "imageUrl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageCropper.prototype, "settings", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ImageCropper.prototype, "cropbox", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ImageCropper.prototype, "loadImageErrorText", void 0);
    __decorate([
        core_1.ViewChild('image'), 
        __metadata('design:type', Object)
    ], ImageCropper.prototype, "image", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageCropper.prototype, "export", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ImageCropper.prototype, "ready", void 0);
    ImageCropper = __decorate([
        core_1.Component({
            selector: 'image-cropper',
            providers: [],
            styleUrls: ['./image-cropper.component.scss', './cropper.scss'],
            templateUrl: './image-cropper.component.jade',
            encapsulation: core_1.ViewEncapsulation.None,
        }), 
        __metadata('design:paramtypes', [])
    ], ImageCropper);
    return ImageCropper;
}());
exports.ImageCropper = ImageCropper;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(1);
var forms_1 = __webpack_require__(42);
var image_cropper_modal_component_1 = __webpack_require__(14);
var angular2_modal_1 = __webpack_require__(0);
var bootstrap_1 = __webpack_require__(9);
var platform_browser_1 = __webpack_require__(43);
function maybe(value) {
    return (value || {});
}
var InputImageCrop = (function () {
    function InputImageCrop(sanitizer, modal, renderer) {
        this.sanitizer = sanitizer;
        this.modal = modal;
        this.renderer = renderer;
        this.modalTitle = 'Crop image';
        this.buttonSaveCaption = 'Save';
        this.buttonCloseCaption = 'Close';
    }
    InputImageCrop.prototype.writeValue = function (value) {
        if (this.recropable) {
            value = maybe(value);
            this.croppedUrl = maybe(value.croppedImage).fullUrl;
            this.croppedRelativeUrl = maybe(value.croppedImage).relativeUrl;
            this.origin = value.originImage;
            this.fileName = value.fileName;
            this.cropbox = value.cropDimension;
            return;
        }
        value = maybe(value);
        this.croppedUrl = value ? value.fullUrl : undefined;
        this.croppedRelativeUrl = value.relativeUrl;
    };
    InputImageCrop.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    InputImageCrop.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    InputImageCrop.prototype.openCropperWindow = function (input) {
        var _this = this;
        var file = input.files[0];
        if (!file) {
            return;
        }
        this.origin = {
            fullUrl: file,
        };
        this.fileName = file.name;
        var url = URL.createObjectURL(file);
        var imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.openModal(imageUrl)
            .then(function (result) {
            if (!result) {
                input.value = '';
            }
            _this.cropbox = result.cropData;
            return _this.updateValue(result);
        })
            .then(function () {
            URL.revokeObjectURL(url);
        });
    };
    InputImageCrop.prototype.ngOnDestroy = function () {
        URL.revokeObjectURL(this.croppedUrl);
    };
    InputImageCrop.prototype.ngAfterViewInit = function () {
        var label = this.labelRef.nativeElement;
        var width = label.offsetWidth;
        if (this.settings) {
            var height = this.settings.height / this.settings.width * width;
            this.renderer.setElementStyle(label, 'minHeight', height + "px");
        }
    };
    InputImageCrop.prototype.remove = function (ev) {
        ev.stopPropagation();
        this.croppedUrl = undefined;
        this.onChange(undefined);
    };
    InputImageCrop.prototype.editImage = function (evnt) {
        var _this = this;
        event.stopPropagation();
        if (!this.recropable) {
            return;
        }
        this.openModal(this.origin.fullUrl)
            .then(function (result) { return _this.updateValue(result); });
    };
    Object.defineProperty(InputImageCrop.prototype, "isEmpty", {
        get: function () {
            return !this.croppedUrl;
        },
        enumerable: true,
        configurable: true
    });
    InputImageCrop.prototype.openModal = function (imageUrl) {
        var config = angular2_modal_1.overlayConfigFactory({
            imageUrl: imageUrl,
            settings: this.settings,
            cropbox: this.cropbox,
            modalTitle: this.modalTitle,
            buttonSaveCaption: this.buttonSaveCaption,
            buttonCloseCaption: this.buttonCloseCaption,
            size: 'lg',
        }, bootstrap_1.BSModalContext);
        return this.modal.open(image_cropper_modal_component_1.ImageCropperModal, config)
            .then(function (r) { return r.result; })
            .catch(function (_) { return undefined; });
    };
    InputImageCrop.prototype.updateValue = function (result) {
        if (!result) {
            return;
        }
        this.value = this.transform(result);
        if (this.onChange) {
            this.onChange(this.value);
        }
    };
    InputImageCrop.prototype.transform = function (result) {
        if (this.croppedUrl) {
            URL.revokeObjectURL(this.croppedUrl);
        }
        this.croppedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result.blob));
        if (this.recropable) {
            var ret_1 = {};
            ret_1.cropDimension = result.cropData;
            ret_1.fileName = this.fileName;
            ret_1.originImage = this.origin;
            ret_1.croppedImage = {
                fullUrl: result.blob,
                relativeUrl: this.croppedRelativeUrl,
            };
            return ret_1;
        }
        var ret = {};
        ret.fullUrl = result.blob;
        ret.relativeUrl = this.croppedRelativeUrl;
        return ret;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputImageCrop.prototype, "settings", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], InputImageCrop.prototype, "recropable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputImageCrop.prototype, "modalTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputImageCrop.prototype, "buttonSaveCaption", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], InputImageCrop.prototype, "buttonCloseCaption", void 0);
    __decorate([
        core_1.ViewChild('label'), 
        __metadata('design:type', core_1.ElementRef)
    ], InputImageCrop.prototype, "labelRef", void 0);
    InputImageCrop = __decorate([
        core_1.Component({
            selector: 'input-image-crop',
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return InputImageCrop; }),
                    multi: true,
                }],
            styleUrls: ['./input-image-crop.component.scss'],
            templateUrl: './input-image-crop.component.jade',
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer, bootstrap_1.Modal, core_1.Renderer])
    ], InputImageCrop);
    return InputImageCrop;
}());
exports.InputImageCrop = InputImageCrop;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(7);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var InnerSubscriber = (function (_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
        _super.call(this);
        this.parent = parent;
        this.outerValue = outerValue;
        this.outerIndex = outerIndex;
        this.index = 0;
    }
    InnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error, this);
        this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete(this);
        this.unsubscribe();
    };
    return InnerSubscriber;
}(Subscriber_1.Subscriber));
exports.InnerSubscriber = InnerSubscriber;
//# sourceMappingURL=InnerSubscriber.js.map

/***/ },
/* 25 */
/***/ function(module, exports) {

"use strict";
"use strict";
exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__(7);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var OuterSubscriber = (function (_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
        _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
        this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
        this.destination.complete();
    };
    return OuterSubscriber;
}(Subscriber_1.Subscriber));
exports.OuterSubscriber = OuterSubscriber;
//# sourceMappingURL=OuterSubscriber.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var isArray_1 = __webpack_require__(8);
var isObject_1 = __webpack_require__(35);
var isFunction_1 = __webpack_require__(18);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(17);
var UnsubscriptionError_1 = __webpack_require__(34);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        this.closed = true;
        var _a = this, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this._subscriptions = null;
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                (errors = errors || []).push(errorObject_1.errorObject.e);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            var index = -1;
            var len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(err.errors);
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var sub = teardown;
        switch (typeof teardown) {
            case 'function':
                sub = new Subscription(teardown);
            case 'object':
                if (sub.closed || typeof sub.unsubscribe !== 'function') {
                    break;
                }
                else if (this.closed) {
                    sub.unsubscribe();
                }
                else {
                    (this._subscriptions || (this._subscriptions = [])).push(sub);
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        return sub;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        // HACK: This might be redundant because of the logic in `add()`
        if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
            return;
        }
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
//# sourceMappingURL=Subscription.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__(2);
var combineLatest_1 = __webpack_require__(32);
Observable_1.Observable.prototype.combineLatest = combineLatest_1.combineLatest;
//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(2);
var ScalarObservable_1 = __webpack_require__(31);
var EmptyObservable_1 = __webpack_require__(30);
var isScheduler_1 = __webpack_require__(37);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayObservable = (function (_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
        _super.call(this);
        this.array = array;
        this.scheduler = scheduler;
        if (!scheduler && array.length === 1) {
            this._isScalar = true;
            this.value = array[0];
        }
    }
    ArrayObservable.create = function (array, scheduler) {
        return new ArrayObservable(array, scheduler);
    };
    /**
     * Creates an Observable that emits some values you specify as arguments,
     * immediately one after the other, and then emits a complete notification.
     *
     * <span class="informal">Emits the arguments you provide, then completes.
     * </span>
     *
     * <img src="./img/of.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the arguments given, and the complete notification thereafter. It can
     * be used for composing with other Observables, such as with {@link concat}.
     * By default, it uses a `null` Scheduler, which means the `next`
     * notifications are sent synchronously, although with a different Scheduler
     * it is possible to determine when those notifications will be delivered.
     *
     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
     * var numbers = Rx.Observable.of(10, 20, 30);
     * var letters = Rx.Observable.of('a', 'b', 'c');
     * var interval = Rx.Observable.interval(1000);
     * var result = numbers.concat(letters).concat(interval);
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link empty}
     * @see {@link never}
     * @see {@link throw}
     *
     * @param {...T} values Arguments that represent `next` values to be emitted.
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emissions of the `next` notifications.
     * @return {Observable<T>} An Observable that emits each given input value.
     * @static true
     * @name of
     * @owner Observable
     */
    ArrayObservable.of = function () {
        var array = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            array[_i - 0] = arguments[_i];
        }
        var scheduler = array[array.length - 1];
        if (isScheduler_1.isScheduler(scheduler)) {
            array.pop();
        }
        else {
            scheduler = null;
        }
        var len = array.length;
        if (len > 1) {
            return new ArrayObservable(array, scheduler);
        }
        else if (len === 1) {
            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
        }
        else {
            return new EmptyObservable_1.EmptyObservable(scheduler);
        }
    };
    ArrayObservable.dispatch = function (state) {
        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
        if (index >= count) {
            subscriber.complete();
            return;
        }
        subscriber.next(array[index]);
        if (subscriber.closed) {
            return;
        }
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var array = this.array;
        var count = array.length;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ArrayObservable.dispatch, 0, {
                array: array, index: index, count: count, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < count && !subscriber.closed; i++) {
                subscriber.next(array[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayObservable;
}(Observable_1.Observable));
exports.ArrayObservable = ArrayObservable;
//# sourceMappingURL=ArrayObservable.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(2);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var EmptyObservable = (function (_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable that emits no items to the Observer and immediately
     * emits a complete notification.
     *
     * <span class="informal">Just emits 'complete', and nothing else.
     * </span>
     *
     * <img src="./img/empty.png" width="100%">
     *
     * This static operator is useful for creating a simple Observable that only
     * emits the complete notification. It can be used for composing with other
     * Observables, such as in a {@link mergeMap}.
     *
     * @example <caption>Emit the number 7, then complete.</caption>
     * var result = Rx.Observable.empty().startWith(7);
     * result.subscribe(x => console.log(x));
     *
     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
     * var interval = Rx.Observable.interval(1000);
     * var result = interval.mergeMap(x =>
     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
     * );
     * result.subscribe(x => console.log(x));
     *
     * @see {@link create}
     * @see {@link never}
     * @see {@link of}
     * @see {@link throw}
     *
     * @param {Scheduler} [scheduler] A {@link Scheduler} to use for scheduling
     * the emission of the complete notification.
     * @return {Observable} An "empty" Observable: emits only the complete
     * notification.
     * @static true
     * @name empty
     * @owner Observable
     */
    EmptyObservable.create = function (scheduler) {
        return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function (arg) {
        var subscriber = arg.subscriber;
        subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function (subscriber) {
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
        }
        else {
            subscriber.complete();
        }
    };
    return EmptyObservable;
}(Observable_1.Observable));
exports.EmptyObservable = EmptyObservable;
//# sourceMappingURL=EmptyObservable.js.map

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(2);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ScalarObservable = (function (_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
        _super.call(this);
        this.value = value;
        this.scheduler = scheduler;
        this._isScalar = true;
        if (scheduler) {
            this._isScalar = false;
        }
    }
    ScalarObservable.create = function (value, scheduler) {
        return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function (state) {
        var done = state.done, value = state.value, subscriber = state.subscriber;
        if (done) {
            subscriber.complete();
            return;
        }
        subscriber.next(value);
        if (subscriber.closed) {
            return;
        }
        state.done = true;
        this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function (subscriber) {
        var value = this.value;
        var scheduler = this.scheduler;
        if (scheduler) {
            return scheduler.schedule(ScalarObservable.dispatch, 0, {
                done: false, value: value, subscriber: subscriber
            });
        }
        else {
            subscriber.next(value);
            if (!subscriber.closed) {
                subscriber.complete();
            }
        }
    };
    return ScalarObservable;
}(Observable_1.Observable));
exports.ScalarObservable = ScalarObservable;
//# sourceMappingURL=ScalarObservable.js.map

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ArrayObservable_1 = __webpack_require__(29);
var isArray_1 = __webpack_require__(8);
var OuterSubscriber_1 = __webpack_require__(26);
var subscribeToResult_1 = __webpack_require__(38);
var none = {};
/**
 * Combines multiple Observables to create an Observable whose values are
 * calculated from the latest values of each of its input Observables.
 *
 * <span class="informal">Whenever any input Observable emits a value, it
 * computes a formula using the latest values from all the inputs, then emits
 * the output of that formula.</span>
 *
 * <img src="./img/combineLatest.png" width="100%">
 *
 * `combineLatest` combines the values from this Observable with values from
 * Observables passed as arguments. This is done by subscribing to each
 * Observable, in order, and collecting an array of each of the most recent
 * values any time any of the input Observables emits, then either taking that
 * array and passing it as arguments to an optional `project` function and
 * emitting the return value of that, or just emitting the array of recent
 * values directly if there is no `project` function.
 *
 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
 * bmi.subscribe(x => console.log('BMI is ' + x));
 *
 * @see {@link combineAll}
 * @see {@link merge}
 * @see {@link withLatestFrom}
 *
 * @param {Observable} other An input Observable to combine with the source
 * Observable. More than one input Observables may be given as argument.
 * @param {function} [project] An optional function to project the values from
 * the combined latest values into a new value on the output Observable.
 * @return {Observable} An Observable of projected values from the most recent
 * values from each input Observable, or an array of the most recent values from
 * each input Observable.
 * @method combineLatest
 * @owner Observable
 */
function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i - 0] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
        project = observables.pop();
    }
    // if the first and only other argument besides the resultSelector is an array
    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
        observables = observables[0];
    }
    observables.unshift(this);
    return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
}
exports.combineLatest = combineLatest;
/* tslint:enable:max-line-length */
var CombineLatestOperator = (function () {
    function CombineLatestOperator(project) {
        this.project = project;
    }
    CombineLatestOperator.prototype.call = function (subscriber, source) {
        return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
    };
    return CombineLatestOperator;
}());
exports.CombineLatestOperator = CombineLatestOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CombineLatestSubscriber = (function (_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
        _super.call(this, destination);
        this.project = project;
        this.active = 0;
        this.values = [];
        this.observables = [];
    }
    CombineLatestSubscriber.prototype._next = function (observable) {
        this.values.push(none);
        this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function () {
        var observables = this.observables;
        var len = observables.length;
        if (len === 0) {
            this.destination.complete();
        }
        else {
            this.active = len;
            this.toRespond = len;
            for (var i = 0; i < len; i++) {
                var observable = observables[i];
                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
            }
        }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
        if ((this.active -= 1) === 0) {
            this.destination.complete();
        }
    };
    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        var values = this.values;
        var oldVal = values[outerIndex];
        var toRespond = !this.toRespond
            ? 0
            : oldVal === none ? --this.toRespond : this.toRespond;
        values[outerIndex] = innerValue;
        if (toRespond === 0) {
            if (this.project) {
                this._tryProject(values);
            }
            else {
                this.destination.next(values.slice());
            }
        }
    };
    CombineLatestSubscriber.prototype._tryProject = function (values) {
        var result;
        try {
            result = this.project.apply(this, values);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return CombineLatestSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.CombineLatestSubscriber = CombineLatestSubscriber;
//# sourceMappingURL=combineLatest.js.map

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__(3);
var Symbol = root_1.root.Symbol;
if (typeof Symbol === 'function') {
    if (Symbol.iterator) {
        exports.$$iterator = Symbol.iterator;
    }
    else if (typeof Symbol.for === 'function') {
        exports.$$iterator = Symbol.for('iterator');
    }
}
else {
    if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
        // Bug for mozilla version
        exports.$$iterator = '@@iterator';
    }
    else if (root_1.root.Map) {
        // es6-shim specific logic
        var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
                exports.$$iterator = key;
                break;
            }
        }
    }
    else {
        exports.$$iterator = '@@iterator';
    }
}
//# sourceMappingURL=iterator.js.map

/***/ },
/* 34 */
/***/ function(module, exports) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ },
/* 35 */
/***/ function(module, exports) {

"use strict";
"use strict";
function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ },
/* 36 */
/***/ function(module, exports) {

"use strict";
"use strict";
function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ },
/* 37 */
/***/ function(module, exports) {

"use strict";
"use strict";
function isScheduler(value) {
    return value && typeof value.schedule === 'function';
}
exports.isScheduler = isScheduler;
//# sourceMappingURL=isScheduler.js.map

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var root_1 = __webpack_require__(3);
var isArray_1 = __webpack_require__(8);
var isPromise_1 = __webpack_require__(36);
var Observable_1 = __webpack_require__(2);
var iterator_1 = __webpack_require__(33);
var InnerSubscriber_1 = __webpack_require__(24);
var observable_1 = __webpack_require__(15);
function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.closed) {
        return null;
    }
    if (result instanceof Observable_1.Observable) {
        if (result._isScalar) {
            destination.next(result.value);
            destination.complete();
            return null;
        }
        else {
            return result.subscribe(destination);
        }
    }
    if (isArray_1.isArray(result)) {
        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
            destination.next(result[i]);
        }
        if (!destination.closed) {
            destination.complete();
        }
    }
    else if (isPromise_1.isPromise(result)) {
        result.then(function (value) {
            if (!destination.closed) {
                destination.next(value);
                destination.complete();
            }
        }, function (err) { return destination.error(err); })
            .then(null, function (err) {
            // Escaping the Promise trap: globally throw unhandled errors
            root_1.root.setTimeout(function () { throw err; });
        });
        return destination;
    }
    else if (typeof result[iterator_1.$$iterator] === 'function') {
        var iterator = result[iterator_1.$$iterator]();
        do {
            var item = iterator.next();
            if (item.done) {
                destination.complete();
                break;
            }
            destination.next(item.value);
            if (destination.closed) {
                break;
            }
        } while (true);
    }
    else if (typeof result[observable_1.$$observable] === 'function') {
        var obs = result[observable_1.$$observable]();
        if (typeof obs.subscribe !== 'function') {
            destination.error(new Error('invalid observable'));
        }
        else {
            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        }
    }
    else {
        destination.error(new TypeError('unknown type returned'));
    }
    return null;
}
exports.subscribeToResult = subscribeToResult;
//# sourceMappingURL=subscribeToResult.js.map

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Subscriber_1 = __webpack_require__(7);
var rxSubscriber_1 = __webpack_require__(16);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.$$rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber();
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var errorObject_1 = __webpack_require__(17);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ },
/* 41 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 42 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_42__;

/***/ },
/* 43 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_43__;

/***/ },
/* 44 */
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_44__;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var module_1 = __webpack_require__(20);
exports.NgCropModule = module_1.NgCropModule;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=index.js.map