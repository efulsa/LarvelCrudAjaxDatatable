$(function () {
    $("#dtTableTicket").DataTable({
        responsive : true,
        autoWidth  : false,
        processing : true,
        searching  : true,
        fixedHeader: {
            "header": false,
            "footer": false
        },
        pageLength  : 10,
        lengthChange: true,
        serverSide  : true,
        lengthMenu  : [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All "]
        ],
        aaSorting: [],
        language : {
            info             : " _START_ sampai _END_ dari _TOTAL_ data",
            emptyTable       : "Data tidak dapat ditemukan.",
            infoEmpty        : "Tidak dapat ditemukan",
            infoFiltered     : "(filter dari _MAX_ total data)",
            zeroRecords      : "Pencarian tidak dapat ditemukan.",
            lengthMenu       : "_MENU_ data per halaman",
            loadingRecords   : "Loading...",
            search           : "_INPUT_",
            searchPlaceholder: "Cari...",
            paginate         : {
                first   : "First",
                last    : "Last",
                next    : ">",
                previous: "<"
            },
            buttons: {
                copy  : "Copy",
                excel : "Excel",
                csv   : "CSV",
                pdf   : "PDF",
                print : "Print",
                colvis: "Column visibility"
            },
            processing: ''
            // processing: '<div class="loader">Loading...</div> Memuat'
        },
        ajax: function (data, callback) {
            $.ajax({
                url       : '/admin/ticketDataTables',
                data      : data,
                dataType  : 'json',
                beforeSend: function () {
                    $('#dtTableTicket > tbody').block({
                        message   : '<i class="fa fa-spinner fa-spin fa-3x fa-fw text-primary"></i>',
                        overlayCSS: {
                            backgroundColor: 'white',
                            opacity        : 0.7
                        },
                        css: {
                            border                 : 'none',
                            padding                : '5px',
                            background             : 'transparent',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius'   : '10px',
                            color                  : 'transparent'
                        },
                    });
                },
                success: function (res) {
                    callback(res);
                }
            });
        },
        columns: [{
                data      : 'id',
                name      : 'id',
                visible   : false,
                searchable: false
            },
            {
                data      : 'DT_RowIndex',
                name      : 'DT_RowIndex',
                orderable : false,
                searchable: false
            },
            {
                data      : 'code',
                name      : 'code',
                searchable: true
            },
            {
                data      : 'author_name',
                name      : 'author_name',
                searchable: true
            },
            {
                data      : 'author_email',
                name      : 'author_email',
                searchable: true
            },
            {
                data      : 'title',
                name      : 'title',
                searchable: true
            },
            {
                data      : 'status',
                name      : 'status',
                searchable: true
            },
            {
                name: 'created_at.timestamp',
                data: {
                    _   : 'created_at.display',
                    sort: 'created_at'
                },
                searchable: false
            },
            {
                data      : 'action',
                name      : 'action',
                orderable : false,
                searchable: false
            },
        ],
        order: [
            [0, 'asc']
        ],
        columnDefs: [{
                targets  : 0,
                sortable : false,
                orderable: false
            },
            {
                targets  : 1,
                sortable : false,
                orderable: false,
                className: "align-middle text-center",
                width    : "6%"
            },
            {
                targets  : 2,
                sortable : true,
                orderable: true,
                className: "align-middle text-center"
            },
            {
                targets  : 3,
                sortable : true,
                orderable: true,
                className: "align-middle"
            },
            {
                targets  : 4,
                sortable : true,
                orderable: true,
                className: "align-middle text-center",
            },
            {
                targets  : 5,
                sortable : true,
                orderable: true,
                className: "align-middle text-center"
            },
            {
                targets  : 6,
                sortable : true,
                orderable: true,
                className: "align-middle text-center",
                render: function ( data, type, row ) {
                    var color = 'black';
                    if (data == 'Open') {
                        color = 'badge-success';
                    }
                    if (data == 'Close') {
                        color = 'badge-danger';
                    }
                    return '<span class="badge badge-pill ' + color + '">' + data + '</span>';
                }
            },
            {
                targets  : 7,
                sortable : true,
                orderable: true,
                className: "align-middle text-center"
            },
            {
                targets  : 8,
                sortable : false,
                orderable: false,
                className: "text-center",
                width    : "10%"
            },
        ],
    });
});
