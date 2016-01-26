console.log('auth');

export function messageHandler(request, cb) {
  cb(null, {
    message: 'Hi from auth'
  });
}
