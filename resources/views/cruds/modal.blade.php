<div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <span id="form_result"></span>

                <form method="post" id="sample_form" class="form-horizontal">
                    @csrf
                    <div class="form-group">
                        <label class="control-label col-md-4">Nama Kategori </label>
                        <input type="text" name="nama_kategori" id="nmCategory" class="form-control"
                            placeholder="Masukkan Nama Kategori" autofocus />
                        <span class="invalid-feedback" role="alert">
                        </span>
                    </div>
                    <div class="form-group">
                        <input type="hidden" name="action" id="action" value="Add" />
                        <input type="hidden" name="id" id="hidden_id" />
                        <button type="submit" name="action_button" id="action_button" class="btn btn-success"
                            value="Add">
                            <i class="fa" id="iconBtn" aria-hidden="true"></i> Simpan
                        </button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Kembali</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
