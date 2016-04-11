// MAP
function(doc) {
  emit(doc._id, null);
}

// ID TERMINA EM 6 :P
function(doc) {
  if (doc._id.match(/.$/)[0] === '6') {
    emit(doc._id, null);
  }
}