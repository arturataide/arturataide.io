/*! Embed Medium as a Blog on Your Site
 * https://medium.com/datadriveninvestor/embed-medium-as-a-blog-on-your-site-54a1b49cbe16
 * Copyright (c) 2019 Sabesan Sathananthan 
 * Adapted by: Artur Ataíde (c) 2020
 */

$(function () {
    var mediumPromise = new Promise(function (resolve) {
        var $content = $('#medium-posts');
        var data = {
            rss: 'https://medium.com/feed/@arturataide'
        };
        console.log("HERE");
        $.get(' https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40arturataide', data, function (response) {
            if (response.status == 'ok') {
                console.log('"response', response);

                var display = '';
                $.each(response.items, function (k, item) {
                    var src = item["thumbnail"]; // use thumbnail url

                    display += `<div class="col-sm-12 col-md-6 post">`;
                    display += `<div class="blog-item box-border">`;
                    display += `<div class="blog-image">`;
                    display += `<div class="blog-intro">`;
                    display += `<img width="100%" src="${src}" alt="/"></div></div>`;
                    display += `<div class="blog-content"><ul class="list-inline mt-4"><li class="list-inline-item"><i class="lni-calendar base-color"></i>`;
                    display += `<span class="text-muted">${item["pubDate"].split(" ")[0]} </span></li></ul>`;
                    display += `<h6 class="mb-3"><a class="text-dark" href="${item["link"]}" target="_blank" data-toggle="modal" data-target="#blog-single">`;
                    display += `${item["title"]}</a></h6>`;
                    display += `<p class="text-dark">Test</p>`;
                    display += `<div class="blog-link"><a class="base-color" href="${item["link"]}" target="_blank" data-toggle="modal" data-target="#blog-single">Read More...</a></div></div></div></div>`;

                    return k < 10;
                });
                // $("#medium-posts").append(display);
                resolve($content.html(display));
            }
        });
    });

    mediumPromise.then(function () {
        //Pagination
        pageSize = 4;

        var pageCount = $(".post").length / pageSize;

        for (var i = 0; i < pageCount; i++) {
            $("#pagination").append(`<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li> `);
        }
        $("#pagination li:nth-child(1)").addClass("active");
        showPage = function (page) {
            $(".post").hide();
            $(".post").each(function (n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagination li").click(function () {
            $("#pagination li").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
});