
import { HiOutlineUser, HiOutlineLockClosed, HiOutlineCog } from 'react-icons/hi';
import Swal from 'sweetalert2'; // Jani ye zaroori hai

const Login = () => {

  // Server Settings Handle karne ka function
  const handleServerSetup = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Server Configuration',
      background: '#f8fafc', // bg-slate-50
      confirmButtonColor: '#0f172a', // Runa Dark
      confirmButtonText: 'Save & Connect',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      // Custom HTML for the inputs
      html: `
        <div class="flex flex-col gap-3 text-left p-2">
          <label class="text-[10px] font-bold text-slate-400 uppercase">Server IP Address</label>
          <input id="swal-input-ip" class="swal2-input !m-0 !w-full !rounded-xl !border-slate-200" placeholder="192.168.1.XX" value="${localStorage.getItem('server_ip') || ''}">
          
          <label class="text-[10px] font-bold text-slate-400 uppercase mt-2">API Port</label>
          <input id="swal-input-port" class="swal2-input !m-0 !w-full !rounded-xl !border-slate-200" placeholder="3000" value="${localStorage.getItem('server_port') || '3000'}">
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const ip = (document.getElementById('swal-input-ip') as HTMLInputElement).value;
        const port = (document.getElementById('swal-input-port') as HTMLInputElement).value;
        
        if (!ip) {
          Swal.showValidationMessage('Please enter a valid IP address');
        }
        return { ip, port };
      }
    });

    if (formValues) {
      // LocalStorage mein save kar liya taake app yaad rakhe
      localStorage.setItem('server_ip', formValues.ip);
      localStorage.setItem('server_port', formValues.port);
      
      Swal.fire({
        icon: 'success',
        title: 'Settings Saved',
        text: `Connected to http://${formValues.ip}:${formValues.port}`,
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-slate-100 font-sans">
      
      {/* Background Blobs remain the same... */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none text-slate-100">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-slate-200 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* Login Card Container */}
      <div className="relative w-full max-w-md p-10 bg-white shadow-2xl rounded-3xl border border-slate-200/60">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-slate-900 rounded-2xl mb-4 shadow-lg">
            <h1 className="text-3xl font-black text-white tracking-tighter">RUNA</h1>
          </div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Retail Management System</p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 mb-2 ml-1 uppercase">Username</label>
            <div className="relative">
              <HiOutlineUser className="absolute left-4 top-3.5 text-slate-400 text-xl group-focus-within:text-indigo-600 transition-colors" />
              <input type="text" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Enter username..." />
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-500 mb-2 ml-1 uppercase">Password</label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-4 top-3.5 text-slate-400 text-xl group-focus-within:text-indigo-600 transition-colors" />
              <input type="password" className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className="w-full mt-4 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg active:scale-95">
            Sign In to Terminal
          </button>
        </form>
      </div>

      {/* Settings Gear - Triggering the function */}
      <button 
        onClick={handleServerSetup}
        className="absolute bottom-8 right-8 flex items-center gap-2 p-3 bg-white/80 backdrop-blur-md shadow-lg border border-slate-200 rounded-2xl text-slate-600 hover:text-indigo-600 transition-all hover:pr-5 group"
      >
        <HiOutlineCog className="text-2xl group-hover:rotate-90 transition-transform duration-500" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 text-sm font-semibold whitespace-nowrap">
          Server Config
        </span>
      </button>
      
    </div>
  );
};

export default Login;