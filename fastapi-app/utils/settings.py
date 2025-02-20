import os
import datetime

GMT_TIMEZONE = datetime.timezone(
    datetime.timedelta(hours=int(os.getenv("GMT_TIMEZONE", 0)))
)
