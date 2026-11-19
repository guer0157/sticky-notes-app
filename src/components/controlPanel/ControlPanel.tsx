const ControlPanel = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <>
      <style jsx>{`
        .controls {
          width: 40px;
          height: 200px;
          background: #cfcfcf;
          position: absolute;
          bottom: 50%;
          left: 5px;
          z-index: 10;
          border-radius: 2rem;
          .add {
            margin-top: 1rem;
            border-radius: 1rem;
            border: none;
            font-size: 1.5rem;
          }
        }
      `}</style>
      <div className="controls">
        <button className="add" onClick={onCreate}>
          +
        </button>
      </div>
    </>
  );
};

export default ControlPanel;
