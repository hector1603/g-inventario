/*
function suggetion() {

     $('#sug_input').keyup(function(e) {

         var formData = {
             'product_name' : $('input[name=title]').val()
         };

         if(formData['product_name'].length >= 1){

           // process the form
           $.ajax({
               type        : 'POST',
               url         : 'ajax.php',
               data        : formData,
               dataType    : 'json',
               encode      : true
           })
               .done(function(data) {
                   //console.log(data);
                   $('#result').html(data).fadeIn();
                   $('#result li').click(function() {

                     $('#sug_input').val($(this).text());
                     $('#result').fadeOut(500);

                   });

                   $("#sug_input").blur(function(){
                     $("#result").fadeOut(500);
                   });

               });

         } else {

           $("#result").hide();

         };

         e.preventDefault();
     });

 }
  $('#sug-form').submit(function(e) {
      var formData = {
          'p_name' : $('input[name=title]').val()
      };
        // process the form
        $.ajax({
            type        : 'POST',
            url         : 'ajax.php',
            data        : formData,
            dataType    : 'json',
            encode      : true
        })
            .done(function(data) {
                //console.log(data);
                $('#product_info').html(data).show();
                total();
                $('.datePicker').datepicker('update', new Date());

            }).fail(function() {
                $('#product_info').html(data).show();
            });
      e.preventDefault();
  });
  function total(){
    $('#product_info input').change(function(e)  {
            var price = +$('input[name=price]').val() || 0;
            var qty   = +$('input[name=quantity]').val() || 0;
            var total = qty * price ;
                $('input[name=total]').val(total.toFixed(2));
    });
  }

  $(document).ready(function() {

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();

    $('.submenu-toggle').click(function () {
       $(this).parent().children('ul.submenu').toggle(200);
    });
    //suggetion for finding product names
    suggetion();
    // Callculate total ammont
    total();

    $('.datepicker')
        .datepicker({
            format: 'yyyy-mm-dd',
            todayHighlight: true,
            autoclose: true
        });
  });
*/

function total(){
    $('#product_info input').change(function(e)  {
        var price = +$('input[name=price]').val() || 0;
        var qty   = +$('input[name=quantity]').val() || 0;
        var total = qty * price ;
        $('input[name=total]').val(total.toFixed(2));
    });
}



// Elimina la función "suggetion" y realiza los siguientes cambios:

$(document).ready(function() {
    var timeout; // Variable para el control del tiempo de espera entre pulsaciones de teclas

    // Función para realizar la búsqueda al escribir en el campo de búsqueda
    $('#sug_input').keyup(function() {
      clearTimeout(timeout); // Limpia el tiempo de espera anterior
      var product_name = $(this).val().trim();
      if (product_name.length >= 1) {
        timeout = setTimeout(function() {
          $.ajax({
            type: 'POST',
            url: 'ajax.php',
            data: { product_name: product_name },
            dataType: 'json',
            encode: true
          }).done(function(data) {
            if (data) {
              $('#result').html(data).fadeIn();
            } else {
              $('#result').html('').fadeOut();
            }
          });
        }, 300); // Tiempo de espera de 300 ms antes de enviar la solicitud
      } else {
        $('#result').html('').fadeOut();
      }
    });

    // Al hacer clic en un resultado, mostrarlo en el campo de búsqueda y cerrar la ventana
    $(document).on('click', '#result li', function() {
      var product_name = $(this).text();
      $('#sug_input').val(product_name);
      $('#result').html('').fadeOut();
    });
  
    // Al hacer clic fuera del campo de búsqueda, cerrar la ventana de sugerencias
    $(document).on('click', function(e) {
      if (!$(e.target).closest('#sug-form').length) {
        $('#result').fadeOut(500);
      }
    });

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();

    $('.submenu-toggle').click(function () {
        $(this).parent().children('ul.submenu').toggle(200);
    });

    // Callculate total ammont
    total();

    $('.datepicker')
        .datepicker({
            format: 'yyyy-mm-dd',
            todayHighlight: true,
            autoclose: true
        });
  });
  