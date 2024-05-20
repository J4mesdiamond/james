
router.put('/updateTask/:id', async (req, res) => {
    try {
      const { title, description, date } = req.body;
      const task = await Task.findByIdAndUpdate(req.params.id, { title, description, date }, { new: true });
      if (!task) {
        return res.status(404).send('Task not found');
      }
      res.send(task);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  