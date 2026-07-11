import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  AlertTriangle,
  Bell,
  ChevronDown,
  CircleMinus,
  CircleHelp,
  Eye,
  EyeOff,
  Grid2X2,
  Leaf,
  Lock,
  LogOut,
  Mail,
  Pencil,
  PlusCircle,
  RotateCcw,
  Settings,
  SquareChartGantt,
  User,
  Wifi,
  X,
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from './lib/supabaseClient';

const initialForm = {
  cod_dep: '50',
  municipio: 'Villavicencio',
  desagregacion: 'MAIZ TECNIFICADO',
  semestre: 'A',
  anio: 2026,
  precip_total_mm: 1200,
  precip_dias_lluvia: 120,
  temp_media_c: 24.5,
  temp_max_media_c: 30,
  temp_min_media_c: 19,
  radiacion_media: 18.5,
  humedad_media_pct: 80,
  semillas: '',
  insumos: '',
  transporte: '',
  mano_obra: '',
};

const modelClimateDefaults = {
  precip_total_mm: initialForm.precip_total_mm,
  temp_max_media_c: initialForm.temp_max_media_c,
  temp_media_c: initialForm.temp_media_c,
  humedad_media_pct: initialForm.humedad_media_pct,
};

const viewTitles = {
  home: 'Dashboard',
  simulation: 'Nueva simulación',
  analysis: 'Mis análisis',
  alerts: 'Alertas',
  settings: 'Configuración',
};

const navItems = [
  { id: 'home', label: 'Inicio', icon: Grid2X2 },
  { id: 'simulation', label: 'Nueva simulación', icon: PlusCircle },
  { id: 'analysis', label: 'Mis análisis', icon: SquareChartGantt },
  { id: 'alerts', label: 'Alertas', icon: Bell },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

const initialAuthForm = {
  fullName: '',
  email: '',
  password: '',
};

function AuthScreen({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [authForm, setAuthForm] = useState(initialAuthForm);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resendingConfirmation, setResendingConfirmation] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [authError, setAuthError] = useState('');
  const [authNotice, setAuthNotice] = useState('');

  const isSignup = mode === 'signup';

  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm((current) => ({ ...current, [name]: value }));
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setShowSuccess(false);
    setRegisteredUser(null);
    setShowPassword(false);
    setConfirmationEmail('');
    setAuthError('');
    setAuthNotice('');
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setAuthError('');
    setAuthNotice('');
    setConfirmationEmail('');

    try {
      const email = authForm.email.trim();
      const password = authForm.password;
      const fullName = authForm.fullName.trim();

      if (isSignup && !fullName) {
        throw new Error('Ingresa tu nombre completo.');
      }

      if (!email || !password) {
        throw new Error('Ingresa tu correo y contraseña.');
      }

      if (!isSupabaseConfigured) {
        const demoUser = {
          email,
          user_metadata: { full_name: fullName || email.split('@')[0] },
          isDemo: true,
        };

        if (isSignup) {
          setRegisteredUser(demoUser);
          setShowSuccess(true);
          return;
        }

        onAuthenticated(demoUser);
        return;
      }

      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;

        setRegisteredUser(data.user);
        setShowSuccess(true);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      onAuthenticated(data.user);
    } catch (err) {
      const message = err.message || 'No se pudo completar la autenticación.';

      if (message.toLowerCase().includes('email not confirmed')) {
        setConfirmationEmail(authForm.email.trim());
        setAuthError('Tu correo todavía no está confirmado. Revisa tu bandeja de entrada o reenvía el correo de confirmación.');
      } else {
        setAuthError(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendConfirmation = async () => {
    const email = confirmationEmail || authForm.email.trim();

    if (!email) {
      setAuthError('Ingresa tu correo para reenviar la confirmación.');
      return;
    }

    if (!isSupabaseConfigured) {
      setAuthNotice('Modo demo: no hay correo de confirmación para reenviar.');
      return;
    }

    setResendingConfirmation(true);
    setAuthError('');
    setAuthNotice('');

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: window.location.origin },
    });

    if (error) {
      setAuthError(error.message || 'No se pudo reenviar el correo de confirmación.');
    } else {
      setAuthNotice('Te reenviamos el correo de confirmación. Revisa tu bandeja de entrada y spam.');
    }

    setResendingConfirmation(false);
  };

  const handleContinue = () => {
    if (registeredUser) {
      onAuthenticated(registeredUser);
      return;
    }

    switchMode('login');
  };

  if (showSuccess) {
    return (
      <main className="auth-page">
        <section className="auth-card auth-success-card" aria-label="Registro exitoso">
          <h1>¡Registro exitoso!</h1>
          <p>
            Tu cuenta ha sido creada correctamente.
            <br />
            Ya puedes comenzar a analizar tus cultivos.
          </p>
          <button className="auth-primary-button" type="button" onClick={handleContinue}>
            Continuar a mi cuenta
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section
        className={`auth-card ${isSignup ? 'auth-signup-card' : 'auth-login-card'}`}
        aria-label={isSignup ? 'Crear cuenta' : 'Iniciar sesión'}
      >
        <h1>{isSignup ? 'Crear cuenta' : 'Iniciar sesión'}</h1>

        <form className="auth-form" onSubmit={handleAuthSubmit}>
          {isSignup && (
            <label className="auth-input">
              <User size={13} strokeWidth={1.7} />
              <input
                autoComplete="name"
                name="fullName"
                placeholder="Nombre completo"
                type="text"
                value={authForm.fullName}
                onChange={handleAuthChange}
              />
            </label>
          )}

          <label className="auth-input">
            <Mail size={13} strokeWidth={1.7} />
            <input
              autoComplete="email"
              name="email"
              placeholder="Correo electrónico"
              type="email"
              value={authForm.email}
              onChange={handleAuthChange}
            />
          </label>

          <label className={`auth-input ${!isSignup ? 'auth-password-input' : ''}`}>
            <Lock size={13} strokeWidth={1.7} />
            <input
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              name="password"
              placeholder="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={authForm.password}
              onChange={handleAuthChange}
            />
            {!isSignup && (
              <button
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="auth-password-toggle"
                type="button"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? <EyeOff size={11} strokeWidth={1.8} /> : <Eye size={11} strokeWidth={1.8} />}
              </button>
            )}
          </label>

          {authError && <p className="auth-error">{authError}</p>}
          {authNotice && <p className="auth-notice">{authNotice}</p>}

          {confirmationEmail && (
            <button
              className="auth-secondary-button"
              disabled={resendingConfirmation}
              type="button"
              onClick={handleResendConfirmation}
            >
              {resendingConfirmation ? 'Reenviando...' : 'Reenviar confirmación'}
            </button>
          )}

          <button className="auth-primary-button" disabled={submitting} type="submit">
            {submitting ? 'Procesando...' : isSignup ? 'Registrarse' : 'Ingresar'}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          <button type="button" onClick={() => switchMode(isSignup ? 'login' : 'signup')}>
            {isSignup ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </section>
    </main>
  );
}

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(isSupabaseConfigured);
  const [activeView, setActiveView] = useState('home');
  const [formData, setFormData] = useState(initialForm);
  const [showClimateNote, setShowClimateNote] = useState(false);
  const [isClimateEditable, setIsClimateEditable] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [installGuideTab, setInstallGuideTab] = useState('android');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return undefined;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAuthUser(data.session?.user ?? null);
      setCheckingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const totalCosts = useMemo(() => {
    const fields = ['semillas', 'insumos', 'transporte', 'mano_obra'];
    return fields.reduce((sum, field) => sum + (Number(formData[field]) || 0), 0);
  }, [formData]);

  const estimatedProfit = useMemo(() => {
    if (!result) return null;
    return result.rendimiento_tha * 1200000 - totalCosts;
  }, [result, totalCosts]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const resetClimateDefaults = () => {
    setFormData((current) => ({
      ...current,
      ...modelClimateDefaults,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      cod_dep: formData.cod_dep,
      desagregacion: formData.desagregacion,
      semestre: formData.semestre,
      anio: formData.anio,
      precip_total_mm: formData.precip_total_mm,
      precip_dias_lluvia: formData.precip_dias_lluvia,
      temp_media_c: formData.temp_media_c,
      temp_max_media_c: formData.temp_max_media_c,
      temp_min_media_c: formData.temp_min_media_c,
      radiacion_media: formData.radiacion_media,
      humedad_media_pct: formData.humedad_media_pct,
    };

    try {
      const response = await axios.post('http://localhost:8000/predict', payload);
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          'No se pudo calcular la simulación. Revisa que el backend esté corriendo en localhost:8000.',
      );
    } finally {
      setLoading(false);
    }
  };

  const displayName = authUser?.user_metadata?.full_name || authUser?.email?.split('@')[0] || 'Juan';

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }

    setAuthUser(null);
    setActiveView('home');
  };

  if (checkingAuth) {
    return (
      <main className="auth-page">
        <section className="auth-card auth-loading-card" aria-label="Cargando sesión">
          <h1>Agropredit</h1>
        </section>
      </main>
    );
  }

  if (!authUser) {
    return <AuthScreen onAuthenticated={setAuthUser} />;
  }

  return (
    <main className="dashboard-page">
      <div className={`app-layout ${activeView === 'simulation' ? 'app-layout-simulation-open' : ''}`} aria-label="Agropredit dashboard">
        <aside className="sidebar">
          <button className="sidebar-brand" type="button" onClick={() => setActiveView('home')}>
            <Leaf size={22} strokeWidth={1.8} />
            <span>Agropredit</span>
          </button>

          <nav className="sidebar-nav" aria-label="Menú principal">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                className={`nav-item ${activeView === id ? 'nav-item-active' : ''}`}
                key={id}
                type="button"
                onClick={() => setActiveView(id)}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <button className="logout-link" type="button" onClick={handleLogout}>
            <LogOut size={17} strokeWidth={1.8} />
            <span>Cerrar sesión</span>
          </button>
        </aside>

        <section className="dashboard-main">
          <div className="dashboard-topline">
            <h1>{viewTitles[activeView]}</h1>
            <div className="online-badge">
              <Wifi size={17} strokeWidth={2} />
              <span>Online</span>
            </div>
          </div>

          {activeView === 'home' && (
            <div className="dashboard-content">
              <section className="welcome-card">
                <h2>Bienvenido, {displayName}</h2>
                <p>¿Listo para una nueva simulación?</p>
                <button className="new-simulation-button" type="button" onClick={() => setActiveView('simulation')}>
                  <PlusCircle size={18} strokeWidth={1.9} />
                  <span>Nueva simulación</span>
                </button>
              </section>

              <section className="summary-card">
                <h2>Resumen rápido</h2>

                <article className="summary-panel">
                  <p>Ultima simulación:</p>
                  <strong>Maíz- Villavicencio - 1er semestre</strong>
                  <span>Ganancia estimada: $900.000</span>
                </article>

                <article className="summary-panel risk-panel">
                  <p>Riesgo actual:</p>
                  <span className="risk-badge">
                    <CircleMinus size={13} fill="currentColor" strokeWidth={0} />
                    Medio
                  </span>
                </article>
              </section>
            </div>
          )}

          {activeView === 'simulation' && (
            <div className="simulation-content">
              <form className="simulation-card" onSubmit={handleSubmit}>
                <div className="simulation-card-header">
                  <div>
                    <Leaf size={18} strokeWidth={1.8} />
                    <h2>Configura tu primera simulación</h2>
                  </div>
                  <button aria-label="Volver al dashboard" type="button" onClick={() => setActiveView('home')}>
                    <X size={18} strokeWidth={1.8} />
                  </button>
                </div>

                <span className="region-chip">Región: Orinoquia</span>

                <div className="simulation-form">
                  <label className="form-field form-field-full">
                    <span>Departamento</span>
                    <select name="cod_dep" value={formData.cod_dep} onChange={handleChange}>
                      <option value="50">Meta</option>
                      <option value="81">Arauca</option>
                      <option value="85">Casanare</option>
                      <option value="99">Vichada</option>
                    </select>
                  </label>

                  <label className="form-field">
                    <span>Cultivo</span>
                    <select name="desagregacion" value={formData.desagregacion} onChange={handleChange}>
                      <option value="MAIZ TECNIFICADO">Maíz</option>
                      <option value="MAIZ TRADICIONAL">Maíz tradicional</option>
                    </select>
                  </label>

                  <label className="form-field">
                    <span>Temporada</span>
                    <select name="semestre" value={formData.semestre} onChange={handleChange}>
                      <option value="A">1er Semestre</option>
                      <option value="B">2do Semestre</option>
                    </select>
                  </label>

                  <div className="form-divider" />

                  <fieldset className="costs-fieldset">
                    <legend>Costos estimados ($)</legend>
                    <label className="form-field">
                      <input
                        min="0"
                        name="semillas"
                        placeholder="Semillas"
                        type="number"
                        value={formData.semillas}
                        onChange={handleChange}
                      />
                    </label>
                    <label className="form-field">
                      <input
                        min="0"
                        name="insumos"
                        placeholder="Insumos"
                        type="number"
                        value={formData.insumos}
                        onChange={handleChange}
                      />
                    </label>
                    <label className="form-field">
                      <input
                        min="0"
                        name="transporte"
                        placeholder="Transporte"
                        type="number"
                        value={formData.transporte}
                        onChange={handleChange}
                      />
                    </label>
                    <label className="form-field">
                      <input
                        min="0"
                        name="mano_obra"
                        placeholder="Mano de obra"
                        type="number"
                        value={formData.mano_obra}
                        onChange={handleChange}
                      />
                    </label>
                  </fieldset>

                  {showClimateNote && (
                    <p className="climate-note" id="climate-note">
                      Valores basados en promedios históricos del último año según departamento y temporada. Puedes
                      editarlos si tienes datos más recientes.
                    </p>
                  )}

                  <details className="climate-details" open>
                    <summary>
                      <span>
                        Pronóstico climático esperado
                        <button
                          aria-controls="climate-note"
                          aria-expanded={showClimateNote}
                          aria-label="Mostrar nota del pronóstico climático"
                          className="climate-help-button"
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            setShowClimateNote((current) => !current);
                          }}
                        >
                          <CircleHelp size={13} strokeWidth={1.9} />
                        </button>
                      </span>
                      <ChevronDown size={16} strokeWidth={1.8} />
                    </summary>

                    <div className="climate-panel-body">
                      {isClimateEditable && (
                        <button className="climate-reset-button" type="button" onClick={resetClimateDefaults}>
                          <RotateCcw size={15} strokeWidth={2} />
                          <span>Restablecer</span>
                        </button>
                      )}

                      <button
                        aria-pressed={isClimateEditable}
                        aria-label="Editar pronóstico climático"
                        className="climate-edit-button"
                        type="button"
                        onClick={() => setIsClimateEditable((current) => !current)}
                      >
                        <Pencil size={18} strokeWidth={2} />
                      </button>

                      <fieldset className="climate-fieldset">
                        <label className="form-field climate-field">
                          <span>Lluvia (mm)</span>
                          <input
                            disabled={!isClimateEditable}
                            name="precip_total_mm"
                            type="number"
                            value={formData.precip_total_mm}
                            onChange={handleChange}
                          />
                        </label>
                        <label className="form-field climate-field">
                          <span>Temp. máx. (°C)</span>
                          <input
                            disabled={!isClimateEditable}
                            name="temp_max_media_c"
                            step="0.1"
                            type="number"
                            value={formData.temp_max_media_c}
                            onChange={handleChange}
                          />
                        </label>
                        <label className="form-field climate-field">
                          <span>Temp. media (°C)</span>
                          <input
                            disabled={!isClimateEditable}
                            name="temp_media_c"
                            step="0.1"
                            type="number"
                            value={formData.temp_media_c}
                            onChange={handleChange}
                          />
                        </label>
                        <label className="form-field climate-field">
                          <span>Humedad (%)</span>
                          <input
                            disabled={!isClimateEditable}
                            name="humedad_media_pct"
                            step="0.1"
                            type="number"
                            value={formData.humedad_media_pct}
                            onChange={handleChange}
                          />
                        </label>
                      </fieldset>
                    </div>
                  </details>

                  <button className="calculate-button" disabled={loading} type="submit">
                    {loading ? 'Calculando simulación...' : 'Calcular simulación'}
                  </button>
                </div>

                {error && <p className="form-error">{error}</p>}

                {result && (
                  <section className="simulation-result">
                    <h3>Resultado de la simulación</h3>
                    <div>
                      <span>Rendimiento estimado</span>
                      <strong>{result.rendimiento_tha} ton/ha</strong>
                    </div>
                    <div>
                      <span>Ganancia estimada</span>
                      <strong>
                        {estimatedProfit?.toLocaleString('es-CO', {
                          style: 'currency',
                          currency: 'COP',
                          maximumFractionDigits: 0,
                        })}
                      </strong>
                    </div>
                  </section>
                )}
              </form>
            </div>
          )}

          {activeView === 'analysis' && (
            <div className="analysis-content">
              <div className="analysis-toolbar">
                <button className="analysis-new-button" type="button" onClick={() => setActiveView('simulation')}>
                  <PlusCircle size={24} strokeWidth={1.9} />
                  <span>Nueva simulación</span>
                </button>
              </div>

              <section className="analysis-summary-card">
                <div className="analysis-summary-header">
                  <div>
                    <h2>Maíz</h2>
                    <p>Arauca - Primer semestre</p>
                  </div>

                  <div className="analysis-profit">
                    <span>Ganancia estimada</span>
                    <strong>$900.000</strong>
                  </div>
                </div>

                <div className="analysis-success-alert">
                  <CircleHelp size={19} strokeWidth={2} />
                  <span>
                    Alta probabilidad de rentabilidad. Las condiciones climáticas son favorables para este ciclo.
                  </span>
                </div>

                <div className="analysis-yield-panel">
                  <span>Rendimiento estimado</span>
                  <strong>{result?.rendimiento_tha ?? 67}</strong>
                  <span>ton/ha</span>
                </div>

                <div className="analysis-metrics-grid">
                  <article className="analysis-metric-card">
                    <h3>Nivel de riesgo</h3>
                    <p className="analysis-risk-value">
                      <AlertTriangle size={31} strokeWidth={1.8} />
                      <span>Bajo</span>
                    </p>
                  </article>

                  <article className="analysis-metric-card">
                    <h3>Predicción climática</h3>
                    <p>Favorable</p>
                  </article>
                </div>
              </section>

              <section className="analysis-install-card">
                <Wifi size={32} strokeWidth={1.8} />
                <div>
                  <h2>Accede a AgroPredict más rápido</h2>
                  <p>
                    Agrega AgroPredict a la pantalla de inicio de tu dispositivo para acceder con un solo toque y
                    continuar utilizando funciones básicas cuando la conexión sea limitada
                  </p>
                  <button type="button" onClick={() => setShowInstallGuide(true)}>
                    Ver cómo hacerlo
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeView === 'settings' && (
            <div className="placeholder-view">
              <h2>Configuración</h2>
              <p>Aquí podrás ajustar tus preferencias de cuenta.</p>
            </div>
          )}

          {activeView === 'alerts' && (
            <div className="placeholder-view">
              <h2>Alertas</h2>
              <p>Aquí verás las alertas importantes de tus cultivos.</p>
            </div>
          )}
        </section>
      </div>

      {showInstallGuide && (
        <div className="install-modal-backdrop" role="presentation">
          <section className="install-modal" aria-labelledby="install-modal-title" role="dialog" aria-modal="true">
            <div className="install-modal-header">
              <h2 id="install-modal-title">Acceso sin conexión</h2>
              <button aria-label="Cerrar guía de acceso sin conexión" type="button" onClick={() => setShowInstallGuide(false)}>
                <X size={30} strokeWidth={1.8} />
              </button>
            </div>

            <div className="install-tabs" role="tablist" aria-label="Sistema operativo">
              <button
                aria-selected={installGuideTab === 'android'}
                role="tab"
                type="button"
                onClick={() => setInstallGuideTab('android')}
              >
                Android
              </button>
              <button
                aria-selected={installGuideTab === 'ios'}
                role="tab"
                type="button"
                onClick={() => setInstallGuideTab('ios')}
              >
                iPhone (iOS)
              </button>
            </div>

            <div className="install-steps" role="tabpanel">
              {installGuideTab === 'android' ? (
                <ol>
                  <li>Abrir el menú ⋮ del navegador.</li>
                  <li>Seleccionar "Agregar a pantalla principal" o "Instalar aplicación".</li>
                  <li>Confirmar la acción.</li>
                </ol>
              ) : (
                <ol>
                  <li>Abrir AgroPredict desde Safari.</li>
                  <li>Pulsar el botón Compartir.</li>
                  <li>Seleccionar "Agregar a pantalla de inicio".</li>
                  <li>Confirmar la acción.</li>
                </ol>
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
