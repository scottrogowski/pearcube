function show_examples() {
    if (is_mobile()) {
        window.location.assign('/Portable-And-Cheap-Photo-Scanner');
    }
    else {
        show_lightbox('#example-popup');
    }

    return false;
}

function post(url, data, cb) {
    var req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.send(data);
    req.onload = function() {
        if (cb !== null) {
            cb(xhr);
        }
    }
}

var EMAIL_REGEX = new RegExp('\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b');

function send_cs_email() {
    var $cs_form_ta = $('#cs-form-ta')
    var $cs_form_in = $('#cs-form-in')
    var are_problems = false

    if ($cs_form_ta.val().length < 3) {
        $cs_form_ta.addClass('form-problems')
        $cs_form_ta.animate({'backgroundColor': '#555555'}, 1000, 'linear',
            function() {
                console.log('done!')
            });
        $cs_form_ta.animate({'backgroundColor': '#ffffff'}, 1000,             'linear',
            function() {
                console.log('done!')
            });
        are_problems = true;
        console.log("too short")
    }
    else {
        $cs_form_ta.removeClass('form-problems')
    }

    if ($cs_form_in.val().length < 3 || !(EMAIL_REGEX.test($cs_form_in.val()))) {
        $cs_form_in.addClass('form-problems')
        $cs_form_in.css({'backgroundColor': 'red'})
        $cs_form_in.animate({'backgroundColor': '#ffffff'}, 1000)
        $cs_form_in.animate({'background-color': '#ffffff'}, 1000)
        are_problems = true;
    }
    else {
        $cs_form_in.removeClass('form-problems')
    }

    if (are_problems) return false;

    $.ajax({
        url: '/cs_request',
        type: 'POST',
        data : $('#cs-form').serialize(),
        success: function(resp) {
            show_lightbox("#clock-popup")
        },
        error: function(xhr, status, error) {
            console.log(xhr, status, error)
            alert("Sorry. There was a problem. Please try again later")
        }
    });
    event.preventDefault()
}
