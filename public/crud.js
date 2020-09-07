// Data Table
$(function () {
    $("#dtTableCategory").DataTable({
        responsive: true,
        autoWidth: false,
        processing: true,
        searching: true,
        fixedHeader: {
            "header": false,
            "footer": false
        },
        pageLength: 10,
        lengthChange: true,
        serverSide: true,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All "]
        ],
        aaSorting: [],
        language: {
            info: " _START_ sampai _END_ dari _TOTAL_ data",
            emptyTable: "Data tidak dapat ditemukan.",
            infoEmpty: "Tidak dapat ditemukan",
            infoFiltered: "(filter dari _MAX_ total data)",
            zeroRecords: "Pencarian tidak dapat ditemukan.",
            lengthMenu: "_MENU_ data per halaman",
            loadingRecords: "Loading...",
            search: "_INPUT_",
            searchPlaceholder: "Cari...",
            paginate: {
                first: "First",
                last: "Last",
                next: ">",
                previous: "<"
            },
            buttons: {
                copy: "Copy",
                excel: "Excel",
                csv: "CSV",
                pdf: "PDF",
                print: "Print",
                colvis: "Column visibility"
            },
            processing: ''
        },
        ajax: function (data, callback) {
            $.ajax({
                url: '/dtTableCategory',
                data: data,
                dataType: 'json',
                beforeSend: function () {
                    $('#dtTableCategory > tbody').block({
                        message: '<i class="fa fa-spinner fa-spin fa-3x fa-fw text-primary"></i>',
                        overlayCSS: {
                            backgroundColor: 'white',
                            opacity: 0.7
                        },
                        css: {
                            border: 'none',
                            padding: '5px',
                            background: 'transparent',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            color: 'transparent'
                        },
                    });
                },
                success: function (res) {
                    callback(res);
                }
            });
        },
        columns: [
            {
                data: 'id',
                name: 'id',
                visible: false,
                searchable: false
            },
            {
                data: 'DT_RowIndex',
                name: 'DT_RowIndex',
                orderable: false,
                searchable: false,
            },
            {
                data: 'nama',
                name: 'nama',
                searchable: true
            },
            {
                name: 'created_at.timestamp',
                data: {
                    _: 'created_at.display',
                    sort: 'created_at'
                },
                searchable: false
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false
            },
        ],
        order: [
            [0, 'asc']
        ],
        columnDefs: [
            {
                targets: 0,
                sortable: false,
                orderable: false
            },
            {
                targets: 1,
                sortable: false,
                orderable: false,
                className: "align-middle text-center",
                width: "6%"
            },
            {
                targets: 2,
                sortable: true,
                orderable: true,
                className: "align-middle",

            },
            {
                targets: 3,
                sortable: true,
                orderable: true,
                className: "align-middle text-center"
            },
            {
                targets: 4,
                sortable: false,
                orderable: false,
                className: "text-center text-nowrap",
                width: "20%"
            },
        ],
    });
});


// Button Create
$(document).on('click', '#createCategory', function () {
    $('.modal-title').text('Buat Kategori Baru');
    $('#action_button').val('Simpan');
    $('#action').val('Add');
    $('#form_result').html('');
    $('#nmCategory').val('');
    $('#iconBtn').addClass('fa-check');
    $('#iconBtn').removeClass('fa-spinner fa-spin');
    $('#iconBtn').removeClass('fa-edit');
    $('#nmCategory').removeClass('is-invalid');
    $('.invalid-feedback').html('');
    $('#formModal').modal('show');
});

// Button Submit
$('#sample_form').on('submit', function (event) {
    event.preventDefault();
    var action_url = '';
// Button Create Store Category
    if ($('#action').val() == 'Add') {
        action_url = "/storeCategory";
        toastText = 'ditambahkan';
    }
// Button Edit Update Category
    if ($('#action').val() == 'Edit') {
        action_url = "/updateCategory";
        toastText = 'diperbarui';
    }

// Store / Update Category
    $.ajax({
        url: action_url,
        method: "POST",
        data: $(this).serialize(),
        dataType: "json",
        beforeSend: function () {
            $('#iconBtn').addClass('fa-spinner fa-spin');
        },
        success: function (data) {

            if (data.errors) {
                $('#iconBtn').removeClass('fa-spinner fa-spin');
                $('#nmCategory').addClass('is-invalid');
                $('.invalid-feedback').html(data.errors);
            } else {
                $('#formModal').modal('hide');
                $('#sample_form')[0].reset();
                $("#dtTableCategory").DataTable().draw();
                setTimeout((function () {
                    toastr.options = {
                        positionClass: 'toast-top-center'
                    };

                    toastr.success("Data telah " + toastText + "", "Berhasil!!");

                    var $notifyContainer = $('#toast-container').closest('.toast-top-center');
                    if ($notifyContainer) {
                        var windowHeight = $(window).height() - 90;
                        $notifyContainer.css("margin-top", windowHeight / 2);
                    }

                }), 800);

            }
            $('#form_result').html('');
        },
        error: function (data) {
            console.log(data.responseJSON);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: "Error when trying save data",
            });
        }
    });
});

// Form Edit
$(document).on('click', '.edit', function () {
    var id = $(this).attr('id');
    $('#form_result').html('');
    $.ajax({
        url: "/editCategory/" + id,
        dataType: "json",
        success: function (data) {
            $('#nmCategory').val(data.result.nama);
            $('#hidden_id').val(id);
            $('.modal-title').text('Edit Kategori');
            $('#action_button').val('Simpan');
            $('#iconBtn').addClass('fa-edit');
            $('#iconBtn').removeClass('fa-check');
            $('#iconBtn').removeClass('fa-spinner fa-spin');
            $('#nmCategory').removeClass('is-invalid');
            $('.invalid-feedback').html('');
            $('#action').val('Edit');
            $('#formModal').modal('show');
        },
        error: function (data) {
            console.log(data.responseJSON);
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: "Error when trying get data",
            });
        }
    })
});

// Hapus
function deleteCategory(idx) {
    Swal.fire({
        title: 'Apakah anda yakin?',
        text: "Anda tidak dapat mengembalikan data ini!",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        cancelButtonText: 'Kembali',
        confirmButtonText: 'Ya, hapus!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                url: "/deleteCategory",
                data: {
                    id: idx
                },
                success: function (data) {
                    $('#dtTableCategory').DataTable().draw();
                    setTimeout((function () {
                        toastr.options = {
                            positionClass: 'toast-top-center'
                        };

                        toastr.success("Data telah dihapus", "Berhasil!!");

                        var $notifyContainer = $('#toast-container').closest('.toast-top-center');
                        if ($notifyContainer) {
                            var windowHeight = $(window).height() - 90;
                            $notifyContainer.css("margin-top", windowHeight / 2);
                        }
                    }), 800);
                },
                error: function (data) {
                    console.log(data.responseJSON);
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: "Error when trying delete data",
                    });
                }
            });
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            toastr.options = {
                positionClass: 'toast-top-center',
                timeOut: 500,
            };

            toastr.error("Data aman :)", "Dibatalkan!!");

            var $notifyContainer = $('#toast-container').closest('.toast-top-center');
            if ($notifyContainer) {
                var windowHeight = $(window).height() - 90;
                $notifyContainer.css("margin-top", windowHeight / 2);
            }
        }
    })
};
