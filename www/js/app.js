// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */

    // var homeTpl = Handlebars.compile($("#home-tpl").html());
    // var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());

    HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
    EmployeeListView.prototype.template = 
            Handlebars.compile($("#employee-list-tpl").html());
    EmployeeView.prototype.template = Handlebars.compile($("#employee-tpl").html());

    var slider = new PageSlider($('body'));
    var service = new EmployeeService();
    service.initialize().done(function () {
        console.log("Service initialized");
        // renderHomeView();
        // $('body').html(new HomeView(service).render().$el);
        router.addRoute('', function() {
              slider.slidePage(new HomeView(service).render().$el);
          });

          router.addRoute('employees/:id', function(id) {
              service.findById(parseInt(id)).done(function(employee) {
                  slider.slidePage(new EmployeeView(employee).render().$el);
              });
          });

          router.start();
    });


    /* --------------------------------- Event Registration -------------------------------- */
    // $('.search-key').on('keyup', findByName);
    // $('.help-btn').on('click', function() {
    //     alert("Employee Directory v3.4");
    // });

    document.addEventListener('deviceready',function(){
        if (navigator.notification){
            window.alert = function(message){
                navigator.notification.alert(
                    message,
                    null,
                    "NamLH.com",
                    'OK')
            };
        }
        FastClick.attach(document.body);
    },false);

    /* ---------------------------------- Local Functions ---------------------------------- */
    // function findByName() {
    //     service.findByName($('.search-key').val()).done(function (employees) {
    //         // $('.content').html(employeeListTpl(employees));
    //         employeeListView.setEmployees(employees);
    //     });
    // }

    // function renderHomeView() {
    //     $('body').html(homeTpl());
    //     $('.search-key').on('keyup', findByName);
    // }

}());