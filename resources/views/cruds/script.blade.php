        <!-- jQuery -->
        <script src="{{ asset('themes/plugins/jquery/jquery.min.js') }}"></script>

        <!-- Bootstrap -->
        <script src="{{ asset('themes/plugins/bootstrap/js/bootstrap.bundle.min.js') }}"></script>

        <!-- DataTables -->
        <script src="{{ asset('themes/plugins/datatables/jquery.dataTables.min.js') }}"></script>
        <script src="{{ asset('themes/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js') }}"></script>
        <script src="{{ asset('themes/plugins/datatables-responsive/js/dataTables.responsive.min.js') }}"></script>
        <script src="{{ asset('themes/plugins/datatables-responsive/js/responsive.bootstrap4.min.js') }}"></script>
        <script src="{{ asset('themes/plugins/datatables-select/js/dataTables.select.min.js') }}"></script>
        <script src="{{ asset('themes/plugins/datatables-select/js/select.bootstrap4.min.js') }}"></script>
        <script src="{{ asset('themes/plugins/datatables-buttons/js/dataTables.buttons.min.js') }}"></script>
        <script src="{{ asset('themes/plugins/datatables-buttons/js/buttons.bootstrap4.min.js') }}"></script>

        <!-- Sweet Alert -->
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
        {{-- <script src="{{ asset('themes/plugins/sweetalert2/sweetalert2.min.js') }}"></script> --}}

        <!-- Toastr -->
        <script src="{{ asset('themes/plugins/toastr/toastr.min.js') }}"></script>

        <!-- overlayScrollbars -->
        <script src="{{ asset('themes/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js') }}"></script>

        <!-- AdminLTE -->
        <script src="{{ asset('themes/dist/js/adminlte.js') }}"></script>

        <!-- BlockUI -->
        <script src="{{ asset('themes/loader/blockUi.js') }}"></script>
        <script src="{{asset('crud.js')}}"></script>


        @if(session('message'))
        <script>
            setTimeout((function () {
                toastr.options = {
                    positionClass: 'toast-top-center'
                };

                toastr.success("{{ @session('message') }}", "Berhasil!!");

                var $notifyContainer = $('#toast-container').closest('.toast-top-center');
                if ($notifyContainer) {
                    var windowHeight = $(window).height() - 90;
                    $notifyContainer.css("margin-top", windowHeight / 2);
                }

            }), 800);
        </script>
        @endif