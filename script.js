/*
 *  yahiarefaiea-official-website-beta 1.0.0
 *  
 *  I’m a 21 years old handsome guy who grows up in a small town in Syria.
 *  http://beta.yahiarefaiea.com/
 *  hello@yahiarefaiea.com
 *  
 *  Last update on: 2018/10/24
 *  ©2018 Yahia Refaiea. all rights reserved.
 */

$(document).ready(function () {
  var input = $('.field').find('input, textarea');
  input.keyup(function () {
    inputTest(this);
  });
});

function inputTest(that) {
  var field = $(that).closest('.field');
  var form = $(that).closest('form, .form');
  var length = $.trim($(that).val()).length;

  //  FILLED
  if (length > 0) field.addClass('filled');else field.removeClass('filled');

  //  VALIDATED
  if (length >= 4) {
    field.addClass('validated');
    form.addClass('validated');
  } else {
    field.removeClass('validated');
    form.removeClass('validated');
  }
}
var Timer = {
  length: null,
  time: null,
  selector: null,
  interval: null,
  callback: null,

  //  RUN
  run: function (selector, callback, length) {
    Timer.length = length;
    Timer.time = Timer.length;
    Timer.selector = selector;
    Timer.callback = callback;
    $(Timer.selector).text(Timer.length);
    Timer.interval = setInterval(Timer.count, 1000);
  },

  //  COUNT
  count: function () {
    Timer.time = Timer.time - 1;
    $(Timer.selector).text(Timer.time);
    if (Timer.time <= 0) {
      if (typeof Timer.callback === 'function' && Timer.callback) Timer.callback();
      Timer.reset();
    }
  },

  //  RESET
  reset: function () {
    clearInterval(Timer.interval);
    Timer.length = null;
    Timer.time = null;
    Timer.selector = null;
    Timer.interval = null;
    Timer.callback = null;
  }
};
var Identity = {
  duration: 1400,
  delay: 500,
  iteration: 0,
  processing: false,
  enough: false,
  interval: null,
  callback: null,
  status: 'loading',
  id: '#identity',
  selector: '#identity div',
  classes: 'working rest robot',

  //  WORK
  work: function () {
    if (Identity.status != 'loading') Identity.status = 'working';
    Identity.wait(function () {
      $(Identity.id).addClass('working');
    });
  },

  //  ROBOT
  robot: function () {
    Identity.status = 'robot';
    Identity.wait(function () {
      $(Identity.id).addClass('robot');
    });
  },

  //  REST
  rest: function () {
    Identity.abort();
    Identity.status = 'rest';
    setTimeout(function () {
      Identity.abort();
      $(Identity.id).addClass('rest');
    }, Identity.delay);
  },

  //  WAIT
  wait: function (call) {
    if (Identity.processing != true) {
      Identity.abort();
      Identity.processing = true;

      setTimeout(function () {
        if (typeof call === 'function' && call) call();
        Identity.waiting();
        Identity.interval = setInterval(Identity.waiting, Identity.duration);
      }, Identity.delay);
    }
  },

  //  WAITING
  waiting: function () {
    if (Identity.enough != true) {
      ++Identity.iteration;
      return;
    }

    Identity.stopping();
  },

  //  STOP
  stop: function (callback) {
    setTimeout(function () {
      if (Identity.processing == true) {
        Identity.enough = true;
        Identity.callback = callback;

        $(Identity.selector).attr('style', 'animation-iteration-count: ' + Identity.iteration + '; -webkit-animation-iteration-count: ' + Identity.iteration + ';');
      }
    }, Identity.delay);
  },

  //  STOPPING
  stopping: function () {
    clearInterval(Identity.interval);
    Identity.rest();

    if (typeof Identity.callback === 'function' && Identity.callback) Identity.callback();
    Identity.reset();
  },

  //  ABORT
  abort: function () {
    if (Identity.status == 'robot') $(Identity.id).removeClass('robot');else if (Identity.status != 'loading' && Identity.processing != true) $(Identity.id).removeClass(Identity.classes + ' loading');else $(Identity.id).removeClass(Identity.classes);
  },

  //  RESET
  reset: function () {
    Identity.iteration = 0;
    Identity.processing = false;
    Identity.enough = false;
    Identity.interval = null;
    Identity.callback = null;

    $(Identity.selector).removeAttr('style');
  }
};
var Stars = {
  canvas: null,
  context: null,
  circleArray: [],
  colorArray: ['#4c1a22', '#4c1a23', '#5d6268', '#1f2e37', '#474848', '#542619', '#ead8cf', '#4c241f', '#d6b9b1', '#964a47'],

  mouseDistance: 50,
  radius: .5,
  maxRadius: 1.5,

  //  MOUSE
  mouse: {
    x: undefined,
    y: undefined,
    down: false,
    move: false
  },

  //  INIT
  init: function () {
    this.canvas = document.getElementById('stars');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.display = 'block';
    this.context = this.canvas.getContext('2d');

    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('resize', this.resize);

    this.prepare();
    this.animate();
  },

  //  CIRCLE
  Circle: function (x, y, dx, dy, radius, fill) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = this.radius;

    this.draw = function () {
      Stars.context.beginPath();
      Stars.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      Stars.context.fillStyle = fill;
      Stars.context.fill();
    };

    this.update = function () {
      if (this.x + this.radius > Stars.canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > Stars.canvas.height || this.y - this.radius < 0) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;

      //  INTERACTIVITY
      if (Stars.mouse.x - this.x < Stars.mouseDistance && Stars.mouse.x - this.x > -Stars.mouseDistance && Stars.mouse.y - this.y < Stars.mouseDistance && Stars.mouse.y - this.y > -Stars.mouseDistance) {
        if (this.radius < Stars.maxRadius) this.radius += 1;
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    };
  },

  //  PREPARE
  prepare: function () {
    this.circleArray = [];

    for (var i = 0; i < 1200; i++) {
      var radius = Stars.radius;
      var x = Math.random() * (this.canvas.width - radius * 2) + radius;
      var y = Math.random() * (this.canvas.height - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 1.5;
      var dy = (Math.random() - 1) * 1.5;
      var fill = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];

      this.circleArray.push(new this.Circle(x, y, dx, dy, radius, fill));
    }
  },

  //  ANIMATE
  animate: function () {
    requestAnimationFrame(Stars.animate);
    Stars.context.clearRect(0, 0, Stars.canvas.width, Stars.canvas.height);

    for (var i = 0; i < Stars.circleArray.length; i++) {
      var circle = Stars.circleArray[i];
      circle.update();
    }
  },

  //  MOUSE MOVE
  mouseMove: function (event) {
    Stars.mouse.x = event.x;
    Stars.mouse.y = event.y;
  },

  //  RESIZE
  resize: function () {
    Stars.canvas.width = window.innerWidth;
    Stars.canvas.height = window.innerHeight;
  }
};
var renderer, scene, camera, ww, wh, particles;

ww = window.innerWidth, wh = window.innerHeight;

var centerVector = new THREE.Vector3(0, 0, 0);
var previousTime = 0;
speed = 10;
isMouseDown = false;

var getImageData = function (image) {

	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0);

	return ctx.getImageData(0, 0, image.width, image.height);
};

function getPixel(imagedata, x, y) {
	var position = (x + imagedata.width * y) * 4,
	    data = imagedata.data;
	return { r: data[position], g: data[position + 1], b: data[position + 2], a: data[position + 3] };
}

var drawTheMap = function () {

	var geometry = new THREE.Geometry();
	var material = new THREE.PointCloudMaterial();
	material.vertexColors = true;
	material.transparent = true;
	for (var y = 0, y2 = imagedata.height; y < y2; y += 1) {
		for (var x = 0, x2 = imagedata.width; x < x2; x += 1) {
			if (imagedata.data[x * 4 + y * 4 * imagedata.width] > 0) {

				var vertex = new THREE.Vector3();
				vertex.x = x - imagedata.width / 2 + (500 - 440 * .5);
				vertex.y = -y + imagedata.height / 2;
				vertex.z = -Math.random() * 500;

				vertex.speed = Math.random() / speed + 0.015;

				var pixelColor = getPixel(imagedata, x, y);
				var color = "rgb(" + pixelColor.r + ", " + pixelColor.g + ", " + pixelColor.b + ")";
				geometry.colors.push(new THREE.Color(color));
				geometry.vertices.push(vertex);
			}
		}
	}
	particles = new THREE.Points(geometry, material);

	scene.add(particles);

	requestAnimationFrame(render);
};

var init = function () {
	renderer = new THREE.WebGLRenderer({
		canvas: document.getElementById("yahia"),
		antialias: true,
		alpha: true
	});
	renderer.setSize(ww, wh);

	scene = new THREE.Scene();

	camera = new THREE.OrthographicCamera(ww / -2, ww / 2, wh / 2, wh / -2, 1, 1000);
	camera.position.set(0, -20, 4);
	camera.lookAt(centerVector);
	scene.add(camera);
	camera.zoom = 1;
	camera.updateProjectionMatrix();

	imagedata = getImageData(image);
	drawTheMap();

	window.addEventListener('mousemove', onMousemove, false);
	window.addEventListener('mousedown', onMousedown, false);
	window.addEventListener('mouseup', onMouseup, false);
	window.addEventListener('resize', onResize, false);
};
var onResize = function () {
	ww = window.innerWidth;
	wh = window.innerHeight;
	renderer.setSize(ww, wh);
	camera.left = ww / -2;
	camera.right = ww / 2;
	camera.top = wh / 2;
	camera.bottom = wh / -2;
	camera.updateProjectionMatrix();
};

var onMouseup = function () {
	isMouseDown = false;
};
var onMousedown = function (e) {
	isMouseDown = true;
	lastMousePos = { x: e.clientX, y: e.clientY };
};
var onMousemove = function (e) {
	if (isMouseDown) {
		camera.position.x += (e.clientX - lastMousePos.x) / 100;
		camera.position.y -= (e.clientY - lastMousePos.y) / 100;
		camera.lookAt(centerVector);
		lastMousePos = { x: e.clientX, y: e.clientY };
	}
};

var render = function (a) {

	requestAnimationFrame(render);

	particles.geometry.verticesNeedUpdate = true;
	if (!isMouseDown) {
		camera.position.x += (0 - camera.position.x) * 0.06;
		camera.position.y += (0 - camera.position.y) * 0.06;
		camera.lookAt(centerVector);
	}

	renderer.render(scene, camera);
};

var imgData = 'data:image/jpeg;base64,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';

var image = document.createElement("img");
image.src = imgData;
var Submit = {

  //  DATA
  data: function (template, fields) {
    var data = {};
    for (i = 0; i < fields.length; i++) {
      var field = $(fields[i]);
      var name = field.attr('name');
      var value = field.val().replace(/(?:\r\n|\r|\n)/g, '<br>');
      data[name] = value;
    }

    return data;
  },

  //  PUSH
  push: function (form) {
    var template = $('.template[data-template=' + form + ']');
    var fields = template.find('.field input, .field textarea');

    //  WAITING
    Submit.view('[data-status=waiting]', template);

    //  AJAX
    $.ajax({
      type: 'POST',
      url: 'includes/php/' + form + '.php',
      data: { dd: JSON.stringify(Submit.data(template, fields)) },
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        Submit.callback('error', form, template, fields);
      },
      success: function (data) {
        Submit.callback('success', form, template, fields);
      }
    });
  },

  //  CALLBACK
  callback: function (status, form, template, fields) {
    setTimeout(function () {

      //  SUCCESS
      if (status == 'success') {
        template.find('.form .status').removeClass('current');
        fields.closest('.field').fadeOut(700);
        fields.closest('.form').find('.submit').fadeOut(700);
        Identity.stop();

        if (form == 'secret') secretAvailability = false;else if (form == 'opinion') opinionAvailability = false;

        setTimeout(function () {
          fields.closest('.form').find('.submit').remove();
          fields.closest('.field').remove();
          template.find('.form .status[data-status=success]').addClass('current');
        }, 750);
      }

      //  ERROR
      else {
          Submit.view('[data-status=error]', template);
          setTimeout(function () {
            Submit.view(':not([data-status])', template);
          }, 6000);
        }
    }, 4000);
  },

  //	VIEW
  view: function (selector, template) {
    template.find('.form .status').removeClass('current');
    template.find('.form .status' + selector).addClass('current');
  },

  //	LISTEN
  listen: function (selector) {
    $(selector).on('click', function (e) {
      if ($(this).closest('.form').hasClass('validated')) {
        var form = $(this).attr('data-form');
        Submit.push(form);
      }

      e.preventDefault();
    });
  }
};
var Router = {
	wrapper: [],
	location: null,

	//	ROUTE
	route: function (location, callback) {
		Identity.work();
		Router.location = Router.processLocation(location);

		//	ROUTES
		Router.routes(callback);
	},

	//	PROCESS LOCATION
	processLocation: function (location) {
		if (location === undefined) location = window.location.hash;

		return location.replace('#', '');
	},

	//	CALLBACK
	callback: function (callback) {
		setTimeout(function () {
			Identity.stop();
      Router.updateWrapper();
      Router.updateTemplate(Router.wrapper[0]);
      window.location.hash = Router.location;
      Router.location = null;

      //  CALLBACKS
      Router.callbacks(Router.wrapper[0]);
      if (typeof callback === 'function' && callback) callback();
		}, 200);
	},

	//	UPDATE TEMPLATE
	updateTemplate: function (template) {
		var templates = $('.template');
		var current = $('.template[data-template=' + template + ']');

		templates.removeClass('current');
		setTimeout(function () {
			templates.hide();
			current.show().addClass('current');
		}, 1120);
	},

	//	UPDATE WRAPPER
	updateWrapper: function (push, pull) {
		if (push) Router.push(push);
		if (pull) Router.pull(pull);

		var wrapper = Router.wrapper.toString().replace(/,/g, ' ');
		$('.wrapper').attr('class', 'wrapper ' + wrapper);
	},

	//	PUSH
	push: function (items) {
		items = items.split(' ');

		for (i = 0; i < items.length; i++) {
			if (!Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.push(items[i]);
		}
	},

	//	PULL
	pull: function (items) {
		items = items.split(' ');

		for (i = 0; i < items.length; i++) {
			if (Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.splice(Router.wrapper.indexOf(items[i]), 1);
		}
	},

	//	LISTEN
	listen: function () {
		$('.wrapper').on('click', '.router', function (e) {
			Router.route($(this).attr('href'), window[$(this).attr('data-callback')]);
			e.preventDefault();
		});

		window.addEventListener('popstate', function (e) {
			Router.route(undefined);
		});
	}
};
Router.routes = function (callback) {
  Router.wrapper = [];
  var location = Router.location.split('/').filter(Boolean);

  //  HOME
  Router.push('home');

  //  CALLBACK
  Router.callback(callback);
};
Router.callbacks = function (wrapper) {
  if (wrapper == 'secret') secret();else if (wrapper == 'opinion') opinion();else if (wrapper == 'bucketAll') bucketAll();else if (wrapper == 'notFound') notFound();
};
var secretAvailability = true;
function secret() {
  if (secretAvailability == true) {
    setTimeout(function () {
      var input = $('.template[data-template=secret] .field').find('input, textarea');

      input.focus();
      Identity.robot();
    }, Identity.duration * 1.25);
  }
}
var opinionAvailability = true;
function opinion() {
  if (opinionAvailability == true) {
    setTimeout(function () {
      var input = $('.template[data-template=opinion] .field').find('input, textarea');

      input.focus();
      Identity.robot();
    }, Identity.duration * 1.25);
  }
}
function bucketAll() {
  var list = $('.template[data-template=bucketAll] .bucketList');
  var link = list.find('li.archived a');

  //  LISTEN
  link.hover(function () {
    list.addClass('hover');
  }, function () {
    list.removeClass('hover');
  });
}
function notFound() {
  setTimeout(function () {
    Timer.run('.template[data-template=notFound] time', function () {
      Router.route('#');
    }, 5);
  }, Identity.duration * 1.25);
}

function notFoundCallback() {
  Timer.reset();
}
var md = new MobileDetect(window.navigator.userAgent);

$(document).ready(function () {
  Identity.work();
  $('.template main').mCustomScrollbar({
    theme: 'dark'
  });
});

function loadProject() {
  Router.route(undefined, function () {

    //  CALLBACK
    Router.listen();
    Submit.listen('.submit');
    if (!md.mobile()) {
      Stars.init();
      init();
    }
    setTimeout(function () {
      $('#signature').removeClass('loading');
    }, Identity.delay * 1.5);
  });
};

loadProject();