class UnrecognizedInputError(Exception):
    """Model reported the uploaded content isn't a valid report (client-side issue, not our fault)."""
    pass