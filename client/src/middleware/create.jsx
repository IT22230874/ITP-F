// middleware/create.js
export const AddFunction = async (
  formData,
  setLoading,
  setError,
  setFormData,
  path
) => {
  try {
    setLoading(true);
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setError(data.message);
    if (!data.success) {
      setLoading(false);
      return;
    }
    setLoading(false);
    setFormData({});
  } catch (error) {
    setLoading(false);
    setError(error.message);
  }
};
