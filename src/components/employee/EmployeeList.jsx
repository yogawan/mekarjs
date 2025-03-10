import { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    nik: "",
    dob: "",
    phone: "",
    email: "",
    address: { street: "", city: "", state: "", postal_code: "", country: "" },
    department: "",
    position: "",
    salary: "",
    bank_account: { bank_name: "", account_number: "" },
    join_date: ""
  });

  const [selectedId, setSelectedId] = useState(null);

  // Fetch data employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/role/admin/employee");
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data karyawan", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle modal open
  const openModal = (employee = null) => {
    setModalOpen(true);
    if (employee) {
      setIsEdit(true);
      setSelectedId(employee._id);
      setFormData(employee);
    } else {
      setIsEdit(false);
      setSelectedId(null);
      setFormData({
        full_name: "",
        nik: "",
        dob: "",
        phone: "",
        email: "",
        address: { street: "", city: "", state: "", postal_code: "", country: "" },
        department: "",
        position: "",
        salary: "",
        bank_account: { bank_name: "", account_number: "" },
        join_date: ""
      });
    }
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    } else if (name.includes("bank_account.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({ ...prev, bank_account: { ...prev.bank_account, [key]: value } }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submit (Add & Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`/api/role/admin/employee/${selectedId}`, formData);
      } else {
        await axios.post("/api/role/admin/employee", formData);
      }
      fetchEmployees();
      setModalOpen(false);
    } catch (error) {
      console.error("Gagal menyimpan data", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus karyawan ini?")) {
      try {
        await axios.delete(`/api/role/admin/employee/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Gagal menghapus data", error);
      }
    }
  };

  const handleCopyAccountNumber = (accountNumber, id) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000); // Reset setelah 2 detik
  };

  return (
    <div className="text-black/75">
      <div className="fixed bottom-5 right-5">
        <button className="p-5 bg-black text-xs text-white/75 rounded-full" onClick={() => openModal()}>Tambah Karyawan</button>
      </div>
      <div className="flex justify-start flex-wrap">
          {employees.map((employee) => (
            <div className="w-[380px] h-fit p-5 mr-2 mb-2 bg-black/5 rounded-3xl" key={employee._id}>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="material-symbols:person" width="16" height="16" />
                <p className="text-xs">{employee.full_name}</p>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="teenyicons:id-solid" width="16" height="16" />
                <p className="text-xs">{employee.nik}</p>

              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="lets-icons:date-fill" width="16" height="16" />
                <p className="text-xs">{new Date(employee.dob).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}</p>

              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="ic:baseline-email" width="16" height="16" />
                <p className="text-xs">{employee.email}</p>

              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="mdi:address-marker" width="16" height="16" />
                <p className="text-xs">{employee.address.street}, {employee.address.city}, {employee.address.state}, {employee.address.postal_code}, {employee.address.country}</p>

              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="tabler:rotate" width="16" height="16" />
                <p className="text-xs">{employee.department}</p>

              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="material-symbols:work" width="16" height="16" />
                <p className="text-xs">{employee.position}</p>

              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="tdesign:money-filled" width="16" height="16" />
                <p className="text-xs">{employee.salary}</p>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="mdi:bank" width="16" height="16" />
                <p className="text-xs">{employee.bank_account.bank_name}</p>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="mingcute:wallet-fill" width="16" height="16" />
                <p className="text-xs">{employee.bank_account.account_number}</p>
              </div>

              <div className="mb-2 flex items-center gap-2">
                <Icon icon="pajamas:status-closed" width="16" height="16" />
                <p className="text-xs">{employee.status}</p>
              </div>

              <div className="flex flex-col">
                <button className="w-full p-3 m-1 border border-black/15 text-black/75 text-xs rounded-full" onClick={() => openModal(employee)}>Edit</button>
                <button
                  className="w-full p-3 m-1 border border-black/15 text-black/75 text-xs rounded-full"
                  onClick={() => handleCopyAccountNumber(employee.bank_account.account_number, employee._id)}
                >
                  {copiedId === employee._id ? "Disalin!" : "Copy No. Rekening"}
                </button>
                <button className="w-full p-4 m-1 bg-black text-white/75 text-xs rounded-full" onClick={() => handleDelete(employee._id)}>Hapus</button>


              </div>
            </div>
          ))}
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-[256px] right-0 h-screen bg-background">
          <h3 className="mt-5 text-center">{isEdit ? "Edit Karyawan" : "Tambah Karyawan"}</h3>
          <form className="flex p-5" onSubmit={handleSubmit}>
            <div className="w-[50%] flex flex-col">
                <input className="bg-black/5 p-3 m-1 rounded-full" type="text" name="full_name" placeholder="Nama Lengkap" value={formData.full_name} onChange={handleChange} required />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="text" name="nik" placeholder="NIK" value={formData.nik} onChange={handleChange} required />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="text" name="phone" placeholder="Nomor Telepon" value={formData.phone} onChange={handleChange} required />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="text" name="address.street" placeholder="Alamat" value={formData.address.street} onChange={handleChange} />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="text" name="address.city" placeholder="Kota" value={formData.address.city} onChange={handleChange} />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="text" name="department" placeholder="Departemen" value={formData.department} onChange={handleChange} required />
            </div>
            <div className="w-[50%] flex flex-col">
                <input className="bg-black/5 p-3 m-1 rounded-full" type="text" name="position" placeholder="Jabatan" value={formData.position} onChange={handleChange} required />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="number" name="salary" placeholder="Gaji" value={formData.salary} onChange={handleChange} required />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="text" name="bank_account.bank_name" placeholder="Bank" value={formData.bank_account.bank_name} onChange={handleChange} />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="text" name="bank_account.account_number" placeholder="No Rekening" value={formData.bank_account.account_number} onChange={handleChange} />
                <input className="bg-black/5 p-3 m-1 rounded-full" type="date" name="join_date" value={formData.join_date} onChange={handleChange} required />
                <button className="p-4 m-1 w-full bg-black text-white rounded-full" type="submit">{isEdit ? "Update" : "Tambah"}</button>
                <button className="p-3 m-1 w-full border border-black/15 text-black rounded-full" onClick={() => setModalOpen(false)}>Tutup</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
