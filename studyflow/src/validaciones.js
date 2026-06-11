export function validarTituloTarea(titulo) {
    if (!titulo) return false;
    
    if (titulo.trim() === "") return false;
    
    if (titulo.length > 100) return false;
  
    return true;
  }