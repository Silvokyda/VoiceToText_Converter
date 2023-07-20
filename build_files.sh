# build_files.sh
pip install -r requirements.txt
echo "Running collectstatic..."
python manage.py collectstatic
