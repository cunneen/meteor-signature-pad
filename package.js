Package.describe({
  summary: "Wrapper for signature-pad https://github.com/szimek/signature_pad",
    version: '1.5.3',
    name: "cunneen:signature-pad",
    githubUrl: 'https://github.com/cunneen/meteor-signature-pad/'
});

Package.on_use(function (api, where) {
  api.add_files('lib/signature_pad.js', 'client');
  api.export('SignaturePad');
});

