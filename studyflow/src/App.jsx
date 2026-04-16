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

  const register = async () => {
    await supabase.auth.signUp({ email, password });
    alert("Usuario creado");
  };

  const login = async () => {
    await supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const cargarTareas = async (id) => {
    const { data, error } = await supabase
      .from("tareas")
      .select("*")
      .eq("user_id", id);

    if (!error) setTareas(data);
  };

  const crearTarea = async () => {
    await supabase.from("tareas").insert([
      { titulo, user_id: session.user.id }
    ]);

    setTitulo("");
    cargarTareas(session.user.id);
  };

  const eliminarTarea = async (id) => {
    await supabase.from("tareas").delete().eq("id", id);
    cargarTareas(session.user.id);
  };

  if (loading) return <h1>Cargando...</h1>;

  if (!session) {
    return (
      <div>
        <h1>StudyFlow</h1>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />

        <br /><br />

        <button onClick={register}>Registrarse</button>
        <button onClick={login}>Login</button>
      </div>
    );
  }

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
              ✏️
            </button>

            <button onClick={() => eliminarTarea(t.id)}>
              ❌
            </button>
      </li>
    ))}
</ul>

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

const editarTarea = async (id, tituloActual) => {
  const nuevoTitulo = prompt("Editar tarea:", tituloActual);

  if (!nuevoTitulo) return;

  await supabase
    .from("tareas")
    .update({ titulo: nuevoTitulo })
    .eq("id", id);

  cargarTareas(session.user.id);
};
export default App;