<!DOCTYPE html>
<html lang="en">

<head>
@include('cruds.head')
</head>

<body>
    <div class="controller">
    <div class="row justify-content-center mt-3">
        <div class="col-md-10">
        <div class="card">
            <div class="card-header">
                <button type="button" name="create_record" id="createCategory" class="btn btn-success btn-sm mb-2">
                    <i class="fa fa-plus" aria-hidden="true"></i> Kategori
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                <table id="dtTableCategory" class="table table-bordered table-hover table-sm nowrap table-striped">
                    <thead class="thead-light">
                        <tr class="text-center">
                            <th style="display: none;">#</th>
                            <th>No</th>
                            <th>Nama Kategori</th>
                            <th>Tgl Dibuat </th>
                            <th>Opsi</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                </div>
            </div>
        </div>
        </div>
    </div>
        @include('cruds.modal')
    </di>
@include('cruds.script')
</body>

</html>