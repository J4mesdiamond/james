
router.delete('/deleteTask/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send('Task deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});
