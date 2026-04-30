import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [titulo, setTitulo] = useState("");
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const iniciar = async () => {
      const { data } = await supabase.auth.getSession();

      setSession(data.session);

      if (data.session) {
        await cargarTareas(data.session.user.id);
      }

      setLoading(false);
    };

    iniciar();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session) {
        await cargarTareas(session.user.id);
      } else {
        setTareas([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ---------------- AUTH ----------------

  const register = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Usuario creado");
    }
  };

const login = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      alert("Email o contraseña incorrectos");
    } else if (error.message.includes("Email not confirmed")) {
      alert("Tenés que confirmar tu email antes de entrar");
    } else {
      alert(error.message);
    }
  }
};
const logout = async () => {
  await supabase.auth.signOut();
};

  // ---------------- TAREAS ----------------

  const cargarTareas = async (userId) => {
    const { data, error } = await supabase
      .from("tareas")
      .select("*")
      .eq("user_id", userId)
      .order("id", { ascending: false });

    if (!error) {
      setTareas(data);
    }
  };

  const crearTarea = async () => {
    if (titulo.trim() === "") return;

    const { error } = await supabase.from("tareas").insert([
      {
        titulo,
        user_id: session.user.id,
      },
    ]);

    if (!error) {
      setTitulo("");
      cargarTareas(session.user.id);
    }
  };

  const eliminarTarea = async (id) => {
    // borrar instantáneo
    setTareas(tareas.filter((t) => t.id !== id));

    const { error } = await supabase
      .from("tareas")
      .delete()
      .eq("id", id);

    if (error) {
      cargarTareas(session.user.id);
    }
  };

  const editarTarea = async (id, tituloActual) => {
    const nuevoTitulo = prompt("Editar tarea:", tituloActual);

    if (!nuevoTitulo || nuevoTitulo.trim() === "") return;

    // cambio instantáneo
    const nuevasTareas = tareas.map((t) =>
      t.id === id ? { ...t, titulo: nuevoTitulo } : t
    );

    setTareas(nuevasTareas);

    const { error } = await supabase
      .from("tareas")
      .update({ titulo: nuevoTitulo })
      .eq("id", id);

    if (error) {
      alert("No se pudo editar");
      cargarTareas(session.user.id);
    }
  };

  // ---------------- LOADING ----------------

  if (loading) return <h1>Cargando...</h1>;

  // ---------------- LOGIN ----------------

  if (!session) {
    return (
      <div>
        <h1>StudyFlow</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button onClick={register}>Registrarse</button>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  // ---------------- APP ----------------

  return (
    <div>
      <h1>Bienvenido</h1>
      <p>{session.user.email}</p>

      <input
        placeholder="Nueva tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <button onClick={crearTarea}>Agregar</button>

      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            {t.titulo}

            <button onClick={() => editarTarea(t.id, t.titulo)}>
              
            </button>

            <button onClick={() => eliminarTarea(t.id)}>
              
            </button>
          </li>
        ))}
      </ul>

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default App;