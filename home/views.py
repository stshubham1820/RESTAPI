from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import render
from .serializers import *
from .models import *
# Create your views here.
@api_view(['GET'])
def api(request):
    message = {
        'status':'Done',
        'Api':'First Api',
    }
    return Response(message)
@api_view(['GET'])
def getdata(request):
    data = Task.objects.all().order_by('name')
    jsondata = Taskserializers(data,many=True)
    return Response(jsondata.data)
@api_view(['GET','POST'])
def createdata(request):
    jsondata = Taskserializers(data=request.data)
    if jsondata.is_valid():
        jsondata.save()
    else:
        pass
    data = Task.objects.all().order_by('name')
    update = Taskserializers(data,many=True)
    return Response(update.data)
@api_view(['GET','POST'])
def updatedata(request,pk):
    vals = Task.objects.get(id=pk)
    ins = Taskserializers(vals,many=False)
    jsondata = Taskserializers(instance=vals,data=request.data)
    if jsondata.is_valid():
        jsondata.save()
    return Response(ins.data)
@api_view(['DELETE'])
def deletedata(request,pk):
    data = Task.objects.get(id=pk)
    data.delete()
    return Response("Item is Been Deleted")
@api_view(['GET'])
def datadetails(request,pk):
    try :
        vals = Task.objects.get(id=pk)
        ins = Taskserializers(vals,many=False)
        return Response(ins.data)
    except Task.DoesNotExist :
        print("Data is Not Here")
        return HttpResponse("No Such Task is There")
def home(request):
    return render(request,'home.html')