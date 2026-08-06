const ModalForm = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input type="text" className="input" placeholder="Your Name" />
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Your Email" />
            <label className="label">Mobile / Whatsapp</label>
            <input
              type="text"
              className="input"
              placeholder="Your Mobile / Whatsapp"
            />
            <label className="label">Message</label>
            <textarea
              className="textarea h-24"
              placeholder="Your Message"
            ></textarea>
            <button className="btn btn-neutral mt-4">
              Book Free Consultation
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
