/*
Copyright (c) 2013, Groupon, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

Neither the name of GROUPON nor the names of its contributors may be
used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Generated by CoffeeScript 2.0.0-beta6
void function () {
  var assert, Element, get, http, inspect, json, parseResponseData;
  http = require('./http');
  assert = require('assertive');
  json = require('./json');
  parseResponseData = require('./parse_response');
  inspect = require('util').inspect;
  get = function (http, root, property) {
    var error, response;
    response = http.get('' + root + '/' + property);
    try {
      return parseResponseData(response);
    } catch (e$) {
      error = e$;
      error.message = 'Error retrieving ' + property + ' from element.\n' + error.message;
      throw error;
    }
  };
  module.exports = Element = function () {
    function Element(param$, param$1) {
      this.http = param$;
      this.elementId = param$1;
      assert.truthy('new Element(http, elementId) - requires http', this.http);
      assert.truthy('new Element(http, elementId) - requires elementId', this.elementId);
      this.root = '/element/' + this.elementId;
    }
    Element.prototype.inspect = function () {
      return inspect(this.constructor.prototype);
    };
    Element.prototype.get = function (attribute) {
      var response;
      assert.truthy('get(attribute) - requires attribute', attribute);
      if (attribute === 'text' || attribute === 'value')
        return get(this.http, this.root, attribute);
      response = this.http.get('' + this.root + '/attribute/' + attribute);
      return parseResponseData(response);
    };
    Element.prototype.getLocationInView = function () {
      var response;
      response = this.http.get('' + this.root + '/location_in_view');
      return parseResponseData(response);
    };
    Element.prototype.getSize = function () {
      var response;
      response = this.http.get('' + this.root + '/size');
      return parseResponseData(response);
    };
    Element.prototype.isVisible = function () {
      var data, response;
      response = this.http.get('' + this.root + '/displayed');
      data = null != response.body ? response.body.toString() : void 0;
      return json.tryParse(data).value;
    };
    Element.prototype.click = function () {
      this.http.post('' + this.root + '/click');
    };
    Element.prototype.type = function (strings) {
      strings = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];
      assert.truthy('type(strings) - requires strings', strings);
      this.http.post('' + this.root + '/value', { value: strings });
    };
    Element.prototype.clear = function () {
      this.http.post('' + this.root + '/clear');
    };
    return Element;
  }();
}.call(this);